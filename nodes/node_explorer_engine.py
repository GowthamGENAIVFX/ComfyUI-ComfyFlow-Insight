class NodeExplorerEngine:

    CATEGORY_MAP = {

        "LoadImage":
            "Image Loader",

        "SaveImage":
            "Image Output",

        "CheckpointLoader":
            "Model Loader",

        "CheckpointLoaderSimple":
            "Model Loader",

        "KSampler":
            "Sampler",

        "VAEDecode":
            "Decoder",

        "VAEEncode":
            "Encoder",

        "VHS_LoadVideo":
            "Video Loader",

        "SaveEXRFrames":
            "Video Output"

    }

    def build(
        self,
        nodes
    ):

        report = []

        for node in nodes:

            input_names = []

            for input_item in node.get(
                "inputs",
                []
            ):

                input_names.append(
                    input_item.get(
                        "name",
                        "Unknown"
                    )
                )

            output_names = []

            for output_item in node.get(
                "outputs",
                []
            ):

                output_names.append(
                    output_item.get(
                        "name",
                        "Unknown"
                    )
                )

            report.append({

                "id":
                    node.get(
                        "id",
                        "Unknown"
                    ),

                "type":
                    node.get(
                        "type",
                        "Unknown"
                    ),

                "category":
                    self.CATEGORY_MAP.get(
                        node.get(
                            "type",
                            ""
                        ),
                        "Custom Node"
                    ),

                "execution_order":
                    node.get(
                        "order",
                        0
                    ),

                "position":
                    node.get(
                        "pos",
                        [0, 0]
                    ),

                "size":
                    node.get(
                        "size",
                        [0, 0]
                    ),

                "input_names":
                    input_names,

                "output_names":
                    output_names,

                "widget_values":
                    node.get(
                        "widgets_values",
                        []
                    )

            })

        return report