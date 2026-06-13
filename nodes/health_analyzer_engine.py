class HealthAnalyzerEngine:

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

        score = 100

        warnings = []

        issues = []

        filtered_nodes = [

            node

            for node in nodes

            if node.get(
                "type",
                ""
            ) not in self.IGNORED_NODES

        ]

        node_lookup = {

            node.get(
                "id"
            ): node

            for node in filtered_nodes

        }

        source_nodes = set()

        target_nodes = set()

        connected_ids = set()

        for link in links:

            if (

                isinstance(
                    link,
                    list
                )

                and

                len(link) >= 4

            ):

                source_id = link[1]

                target_id = link[3]

                source_nodes.add(
                    source_id
                )

                target_nodes.add(
                    target_id
                )

                connected_ids.add(
                    source_id
                )

                connected_ids.add(
                    target_id
                )

        #
        # FIND EXIT NODES
        #

        exit_nodes = []

        for node in filtered_nodes:

            node_id = node.get(
                "id"
            )

            if (

                node_id in source_nodes

                and

                node_id not in target_nodes

            ):

                exit_nodes.append(
                    node
                )

        #
        # SAVE NODES
        #

        save_nodes = []

        for node in filtered_nodes:

            node_type = str(

                node.get(
                    "type",
                    ""
                )

            ).lower()

            if (

                "save" in node_type

                or

                "output" in node_type

            ):

                save_nodes.append(
                    node
                )

        #
        # MISSING SAVE NODE
        #

        if len(save_nodes) == 0:

            warnings.append(
                "No Save Node Found"
            )

            target_node = None

            if exit_nodes:

                target_node = exit_nodes[0]

            elif filtered_nodes:

                target_node = filtered_nodes[0]

            issues.append({

                "node_id":

                    target_node.get(
                        "id"
                    )

                    if target_node

                    else None,

                "node_type":

                    target_node.get(
                        "type",
                        "Unknown"
                    )

                    if target_node

                    else "Workflow",

                "issue_type":
                    "Missing Save Node",

                "reason":
                    "Workflow generates output but never saves it.",

                "recommendation":
                    "Add SaveImage, SaveVideo or another output node after this node.",

                "risk":
                    "High"

            })

            score -= 20

        #
        # ORPHAN NODES
        #

        orphan_nodes = []

        for node in filtered_nodes:

            node_id = node.get(
                "id"
            )

            if node_id not in connected_ids:

                orphan_nodes.append(
                    node
                )

        for node in orphan_nodes:

            issues.append({

                "node_id":
                    node.get(
                        "id"
                    ),

                "node_type":
                    node.get(
                        "type",
                        "Unknown"
                    ),

                "issue_type":
                    "Orphan Node",

                "reason":
                    "Node has no incoming or outgoing connections.",

                "recommendation":
                    "Delete this node if it is unused or connect it to the workflow.",

                "risk":
                    "Low"

            })

        if orphan_nodes:

            warnings.append(

                f"{len(orphan_nodes)} Orphan Nodes Found"

            )

            score -= (

                len(
                    orphan_nodes
                ) * 5

            )

        #
        # DEAD END NODES
        #

        dead_end_nodes = []

        for node in filtered_nodes:

            node_id = node.get(
                "id"
            )

            outputs = node.get(
                "outputs",
                []
            )

            node_type = str(

                node.get(
                    "type",
                    ""
                )

            ).lower()

            if (

                node_id in connected_ids

                and

                node_id not in source_nodes

                and

                outputs

                and

                "save" not in node_type

                and

                "output" not in node_type

            ):

                dead_end_nodes.append(
                    node
                )

        for node in dead_end_nodes:

            issues.append({

                "node_id":
                    node.get(
                        "id"
                    ),

                "node_type":
                    node.get(
                        "type",
                        "Unknown"
                    ),

                "issue_type":
                    "Dead End Node",

                "reason":
                    "Node output is never consumed by another node.",

                "recommendation":
                    "Connect this node to another node or delete it.",

                "risk":
                    "Medium"

            })

        if dead_end_nodes:

            warnings.append(

                f"{len(dead_end_nodes)} Dead End Nodes Found"

            )

            score -= (

                len(
                    dead_end_nodes
                ) * 3

            )

        #
        # DUPLICATE LOADERS
        #

        loader_counts = {}

        for node in filtered_nodes:

            node_type = str(

                node.get(
                    "type",
                    ""
                )

            )

            loader_counts[
                node_type
            ] = (

                loader_counts.get(
                    node_type,
                    0
                )

                + 1

            )

        for name, count in loader_counts.items():

            if (

                count > 1

                and

                (

                    "loader"
                    in name.lower()

                    or

                    "checkpoint"
                    in name.lower()

                )

            ):

                duplicate_nodes = [

                    node

                    for node in filtered_nodes

                    if node.get(
                        "type",
                        ""
                    ) == name

                ]

                target_node = None

                if duplicate_nodes:

                    target_node = duplicate_nodes[0]

                issues.append({

                    "node_id":

                        target_node.get(
                            "id"
                        )

                        if target_node

                        else None,

                    "node_type":
                        name,

                    "issue_type":
                        "Duplicate Loader",

                    "reason":
                        f"{count} identical loader nodes detected.",

                    "recommendation":
                        "Reuse one loader and connect multiple workflow branches.",

                    "risk":
                        "Medium"

                })

                score -= 10

        #
        # WORKFLOW HEALTH STATUS
        #

        if score >= 90:

            health_status = "Excellent"

        elif score >= 70:

            health_status = "Good"

        elif score >= 50:

            health_status = "Needs Attention"

        else:

            health_status = "Critical"

        score = max(
            score,
            0
        )

        return {

            "score":
                score,

            "status":
                health_status,

            "warnings":
                warnings,

            "issues":
                issues,

            "orphan_nodes":
                len(
                    orphan_nodes
                ),

            "dead_end_nodes":
                len(
                    dead_end_nodes
                ),

            "save_nodes":
                len(
                    save_nodes
                ),

            "exit_nodes":
                len(
                    exit_nodes
                )

        }