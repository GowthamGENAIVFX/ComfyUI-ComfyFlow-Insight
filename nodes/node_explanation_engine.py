class NodeExplanationEngine:

    DESCRIPTIONS = {

        "LoadImage":
            "Loads an image into the workflow.",

        "SaveImage":
            "Saves the generated image.",

        "KSampler":
            "Performs diffusion sampling.",

        "VAEDecode":
            "Decodes latent data into an image.",

        "VAEEncode":
            "Encodes image data into latent space.",

        "CheckpointLoader":
            "Loads a diffusion checkpoint model.",

        "CheckpointLoaderSimple":
            "Loads a diffusion checkpoint model."

    }

    def build(
        self,
        nodes
    ):

        text = "# Node Explanations\n\n"

        seen = set()

        for node in nodes:

            node_type = node.get(
                "type",
                "Unknown"
            )

            if node_type in seen:
                continue

            seen.add(
                node_type
            )

            description = (
                self.DESCRIPTIONS.get(
                    node_type,
                    "Custom or unknown node."
                )
            )

            text += (
                f"## {node_type}\n\n"
                f"{description}\n\n"
            )

        return text