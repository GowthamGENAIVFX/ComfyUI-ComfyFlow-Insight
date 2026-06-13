class DiagramEngine:

    def generate(
        self,
        nodes,
        links
    ):

        node_map = {

            node["id"]:
            node["type"]

            for node in nodes

        }

        diagram = [
            "graph LR"
        ]

        for link in links:

            source = link[1]
            target = link[3]

            if (
                source in node_map
                and
                target in node_map
            ):

                diagram.append(

                    f"{node_map[source]} --> {node_map[target]}"

                )

        return "\n".join(
            diagram
        )