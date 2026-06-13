class BranchAnalyzerEngine:

    IGNORED_NODES = {

        "WorkflowInspector",

        "WorkflowDocumentationGenerator",

        "WorkflowOptimizer",

        "WorkflowComparator"

    }

    def analyze(
        self,
        nodes,
        links
    ):

        filtered_nodes = []

        for node in nodes:

            node_type = node.get(
                "type",
                ""
            )

            if (
                node_type
                in
                self.IGNORED_NODES
            ):
                continue

            filtered_nodes.append(
                node
            )

        nodes = filtered_nodes

        node_map = {}

        outgoing = {}

        incoming = {}

        for node in nodes:

            node_id = node.get(
                "id"
            )

            node_map[
                node_id
            ] = node

            outgoing[
                node_id
            ] = []

            incoming[
                node_id
            ] = []

        for link in links:

            if (
                not isinstance(
                    link,
                    list
                )
            ):
                continue

            if len(link) < 4:
                continue

            source_id = link[1]
            target_id = link[3]

            if (
                source_id not in outgoing
                or
                target_id not in incoming
            ):
                continue

            outgoing[
                source_id
            ].append(
                target_id
            )

            incoming[
                target_id
            ].append(
                source_id
            )

        branch_nodes = []

        merge_nodes = []

        max_branch_width = 0

        for node_id, children in outgoing.items():

            child_count = len(
                children
            )

            if child_count > 1:

                max_branch_width = max(
                    max_branch_width,
                    child_count
                )

                node = node_map.get(
                    node_id,
                    {}
                )

                branch_nodes.append({

                    "node_id":
                        node_id,

                    "node_type":
                        node.get(
                            "type",
                            "Unknown"
                        ),

                    "outputs":
                        child_count

                })

        for node_id, parents in incoming.items():

            parent_count = len(
                parents
            )

            if parent_count > 1:

                node = node_map.get(
                    node_id,
                    {}
                )

                merge_nodes.append({

                    "node_id":
                        node_id,

                    "node_type":
                        node.get(
                            "type",
                            "Unknown"
                        ),

                    "inputs":
                        parent_count

                })

        visited = set()

        connected_components = 0

        def dfs(
            node_id
        ):

            if node_id in visited:
                return

            visited.add(
                node_id
            )

            for child in outgoing.get(
                node_id,
                []
            ):

                dfs(
                    child
                )

            for parent in incoming.get(
                node_id,
                []
            ):

                dfs(
                    parent
                )

        for node in nodes:

            node_id = node.get(
                "id"
            )

            if node_id not in visited:

                connected_components += 1

                dfs(
                    node_id
                )

        parallel_paths = max(
            1,
            len(branch_nodes) + 1
        )

        branch_score = (

            len(branch_nodes) * 10

            +

            len(merge_nodes) * 8

            +

            max_branch_width * 5

        )

        if branch_score <= 10:

            branch_complexity = (
                "Low"
            )

        elif branch_score <= 30:

            branch_complexity = (
                "Medium"
            )

        else:

            branch_complexity = (
                "High"
            )

        insights = []

        if len(branch_nodes) == 0:

            insights.append(
                "Workflow contains a single execution path."
            )

        else:

            insights.append(
                f"{len(branch_nodes)} branch node(s) detected."
            )

        if len(merge_nodes) > 0:

            insights.append(
                f"{len(merge_nodes)} merge node(s) detected."
            )

        if max_branch_width > 0:

            insights.append(
                f"Maximum branch width is {max_branch_width}."
            )

        insights.append(
            f"Branch complexity is {branch_complexity}."
        )

        return {

            "branch_nodes":
                branch_nodes,

            "merge_nodes":
                merge_nodes,

            "branch_node_count":
                len(
                    branch_nodes
                ),

            "merge_node_count":
                len(
                    merge_nodes
                ),

            "parallel_paths":
                parallel_paths,

            "max_branch_width":
                max_branch_width,

            "connected_components":
                connected_components,

            "branch_complexity":
                branch_complexity,

            "branch_score":
                branch_score,

            "insights":
                insights

        }