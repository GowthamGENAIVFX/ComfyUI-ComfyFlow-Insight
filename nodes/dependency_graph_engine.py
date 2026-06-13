class DependencyGraphEngine:

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

        dependencies = {}

        dependents = {}

        for node in nodes:

            node_id = node.get(
                "id"
            )

            node_map[
                node_id
            ] = node

            dependencies[
                node_id
            ] = []

            dependents[
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
                source_id not in node_map
                or
                target_id not in node_map
            ):
                continue

            dependencies[
                target_id
            ].append(
                source_id
            )

            dependents[
                source_id
            ].append(
                target_id
            )

        dependency_nodes = []

        max_dependencies = 0

        max_dependents = 0

        most_dependent_node = None

        most_connected_node = None

        for node_id in node_map:

            dependency_count = len(
                dependencies[
                    node_id
                ]
            )

            dependent_count = len(
                dependents[
                    node_id
                ]
            )

            max_dependencies = max(
                max_dependencies,
                dependency_count
            )

            max_dependents = max(
                max_dependents,
                dependent_count
            )

            dependency_nodes.append({

                "node_id":
                    node_id,

                "node_type":
                    node_map[
                        node_id
                    ].get(
                        "type",
                        "Unknown"
                    ),

                "dependency_count":
                    dependency_count,

                "dependent_count":
                    dependent_count,

                "dependencies":
                    dependencies[
                        node_id
                    ],

                "dependents":
                    dependents[
                        node_id
                    ]

            })

        if dependency_nodes:

            most_dependent_node = max(

                dependency_nodes,

                key=lambda x:
                x[
                    "dependency_count"
                ]

            )

            most_connected_node = max(

                dependency_nodes,

                key=lambda x:
                x[
                    "dependent_count"
                ]

            )

        isolated_nodes = []

        for node in dependency_nodes:

            if (

                node[
                    "dependency_count"
                ] == 0

                and

                node[
                    "dependent_count"
                ] == 0

            ):

                isolated_nodes.append(
                    node
                )

        complexity_score = (

            max_dependencies * 5

            +

            max_dependents * 5

            +

            len(
                isolated_nodes
            ) * 2

        )

        if complexity_score <= 15:

            dependency_complexity = (
                "Low"
            )

        elif complexity_score <= 40:

            dependency_complexity = (
                "Medium"
            )

        else:

            dependency_complexity = (
                "High"
            )

        insights = []

        insights.append(

            f"Maximum dependency count is {max_dependencies}."

        )

        insights.append(

            f"Maximum dependent count is {max_dependents}."

        )

        insights.append(

            f"{len(isolated_nodes)} isolated node(s) detected."

        )

        insights.append(

            f"Dependency complexity is {dependency_complexity}."

        )

        return {

            "dependency_nodes":
                dependency_nodes,

            "most_dependent_node":
                most_dependent_node,

            "most_connected_node":
                most_connected_node,

            "isolated_nodes":
                isolated_nodes,

            "isolated_node_count":
                len(
                    isolated_nodes
                ),

            "max_dependencies":
                max_dependencies,

            "max_dependents":
                max_dependents,

            "dependency_complexity":
                dependency_complexity,

            "dependency_score":
                complexity_score,

            "insights":
                insights

        }