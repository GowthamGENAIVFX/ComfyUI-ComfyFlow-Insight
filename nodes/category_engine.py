CATEGORY_MAP = {

    "CheckpointLoader":
        "Model Loader",

    "CheckpointLoaderSimple":
        "Model Loader",

    "LoadImage":
        "Image Loader",

    "VHS_LoadVideo":
        "Video Loader",

    "KSampler":
        "Sampler",

    "VAEDecode":
        "Decoder",

    "VAEEncode":
        "Encoder",

    "SaveImage":
        "Output",

    "SaveEXRFrames":
        "Output"
}


class CategoryEngine:

    def analyze(
        self,
        nodes
    ):

        categories = {}

        for node in nodes:

            node_type = node.get(
                "type",
                "Unknown"
            )

            category = CATEGORY_MAP.get(
                node_type,
                "Other"
            )

            categories[
                category
            ] = categories.get(
                category,
                0
            ) + 1

        return categories