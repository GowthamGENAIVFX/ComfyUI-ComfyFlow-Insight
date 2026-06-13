class OptimizationEngine:

    def analyze(
        self,
        nodes
    ):

        suggestions = []

        node_types = [

            node.get(
                "type",
                ""
            )

            for node in nodes

        ]

        if (
            node_types.count(
                "CheckpointLoader"
            ) > 1
        ):

            suggestions.append(
                "Duplicate checkpoint loaders detected."
            )

        if (
            node_types.count(
                "VAEDecode"
            ) > 1
        ):

            suggestions.append(
                "Multiple VAEDecode nodes detected."
            )

        if not suggestions:

            suggestions.append(
                "No optimization issues detected."
            )

        return suggestions