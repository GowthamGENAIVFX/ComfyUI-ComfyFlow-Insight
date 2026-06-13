class OptimizationNotesEngine:

    def build(
        self,
        optimizations
    ):

        text = (
            "# Optimization Notes\n\n"
        )

        if not optimizations:

            text += (
                "- No optimization issues detected.\n"
            )

            return text

        for item in optimizations:

            text += (
                f"- {item}\n"
            )

        return text