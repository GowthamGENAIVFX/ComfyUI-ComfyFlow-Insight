class ArchitectureAnalyzerEngine:

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

        for node in nodes:

            node_map[
                node.get("id")
            ] = node

        outgoing = {}

        incoming = {}

        for node in nodes:

            node_id = node.get(
                "id"
            )

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

        entry_nodes = []

        exit_nodes = []

        for node in nodes:

            node_id = node.get(
                "id"
            )

            if len(
                incoming.get(
                    node_id,
                    []
                )
            ) == 0:

                entry_nodes.append(
                    {
                        "id":
                            node_id,
                        "type":
                            node.get(
                                "type",
                                "Unknown"
                            )
                    }
                )

            if len(
                outgoing.get(
                    node_id,
                    []
                )
            ) == 0:

                exit_nodes.append(
                    {
                        "id":
                            node_id,
                        "type":
                            node.get(
                                "type",
                                "Unknown"
                            )
                    }
                )

        def dfs_depth(
            node_id,
            visited=None
        ):

            if visited is None:
                visited = set()

            if node_id in visited:
                return 0

            visited.add(
                node_id
            )

            children = outgoing.get(
                node_id,
                []
            )

            if not children:
                return 1

            return (
                1
                +
                max(
                    dfs_depth(
                        child,
                        visited.copy()
                    )
                    for child
                    in children
                )
            )

        longest_path = 0

        for entry in entry_nodes:

            depth = dfs_depth(
                entry["id"]
            )

            longest_path = max(
                longest_path,
                depth
            )

        workflow_depth = (
            longest_path
        )

        branch_count = 0

        for node_id, children in outgoing.items():

            if len(children) > 1:

                branch_count += 1

        visited = set()

        disconnected_graphs = 0

        def dfs_graph(
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

                dfs_graph(
                    child
                )

            for parent in incoming.get(
                node_id,
                []
            ):

                dfs_graph(
                    parent
                )

        for node in nodes:

            node_id = node.get(
                "id"
            )

            if node_id not in visited:

                disconnected_graphs += 1

                dfs_graph(
                    node_id
                )

        health = "Healthy"

        insights = []

        if len(exit_nodes) == 0:

            health = "Critical"

            insights.append(
                "Workflow has no exit nodes."
            )

        else:

            insights.append(
                "Workflow contains valid exit nodes."
            )

        if disconnected_graphs > 1:

            health = "Warning"

            insights.append(
                f"{disconnected_graphs} disconnected workflow graphs detected."
            )

        else:

            insights.append(
                "No disconnected branches detected."
            )

        if branch_count == 0:

            insights.append(
                "Workflow contains a single execution path."
            )

        else:

            insights.append(
                f"Workflow contains {branch_count} branching points."
            )

        if workflow_depth > 20:

            insights.append(
                "Workflow is very deep and may be difficult to maintain."
            )

        architecture_tree = []

        def build_path(
            node_id,
            current_path
        ):

            current_node = node_map.get(
                node_id
            )

            if not current_node:
                return

            current_path = (
                current_path
                +
                [
                    current_node.get(
                        "type",
                        "Unknown"
                    )
                ]
            )

            children = outgoing.get(
                node_id,
                []
            )

            if not children:

                architecture_tree.append(
                    current_path
                )

                return

            for child in children:

                build_path(
                    child,
                    current_path
                )

        for entry in entry_nodes:

            build_path(
                entry["id"],
                []
            )

        return {

            "health":
                health,

            "workflow_depth":
                workflow_depth,

            "longest_path":
                longest_path,

            "branch_count":
                branch_count,

            "disconnected_graphs":
                disconnected_graphs,

            "entry_nodes":
                entry_nodes,

            "exit_nodes":
                exit_nodes,

            "insights":
                insights,

            "architecture_tree":
                architecture_tree

        }