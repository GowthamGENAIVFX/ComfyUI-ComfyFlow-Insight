class WorkflowActionsEngine:

    def analyze(
        self,
        nodes,
        links
    ):

        node_map = {}

        incoming = {}

        outgoing = {}

        for node in nodes:

            node_id = node.get(
                "id"
            )

            node_map[
                node_id
            ] = node

            incoming[
                node_id
            ] = []

            outgoing[
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
                source_id
                in
                outgoing
            ):
                outgoing[
                    source_id
                ].append(
                    target_id
                )

            if (
                target_id
                in
                incoming
            ):
                incoming[
                    target_id
                ].append(
                    source_id
                )

        actions = []

        for node in nodes:

            node_id = node.get(
                "id"
            )

            node_type = node.get(
                "type",
                "Unknown"
            )

            actions.append({

                "node_id":
                    node_id,

                "node_type":
                    node_type,

                "available_actions": [

                    {
                        "action":
                            "locate",

                        "label":
                            "Locate Node"
                    },

                    {
                        "action":
                            "select",

                        "label":
                            "Select Node"
                    },

                    {
                        "action":
                            "zoom",

                        "label":
                            "Zoom To Node"
                    }

                ],

                "dependency_count":
                    len(
                        incoming.get(
                            node_id,
                            []
                        )
                    ),

                "dependent_count":
                    len(
                        outgoing.get(
                            node_id,
                            []
                        )
                    )

            })

        summary = {

            "total_nodes":
                len(nodes),

            "actionable_nodes":
                len(actions),

            "supported_actions": [

                "locate",

                "select",

                "zoom"

            ]

        }

        insights = []

        insights.append(
            f"{len(actions)} nodes support workflow actions."
        )

        insights.append(
            "Locate Node allows fast navigation."
        )

        insights.append(
            "Select Node enables workflow inspection."
        )

        insights.append(
            "Zoom To Node improves debugging speed."
        )

        return {

            "summary":
                summary,

            "actions":
                actions,

            "insights":
                insights

        }