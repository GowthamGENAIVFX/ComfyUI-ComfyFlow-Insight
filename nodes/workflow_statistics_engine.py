class WorkflowStatisticsEngine:

    CATEGORY_MAP = {

        "LoadImage":
            "Image Loader",

        "SaveImage":
            "Output",

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

        "CLIPTextEncode":
            "Conditioning",

        "ConditioningCombine":
            "Conditioning",

        "ConditioningAverage":
            "Conditioning",

        "VHS_LoadVideo":
            "Video Loader",

        "SaveEXRFrames":
            "Output"

    }

    IGNORED_NODES = {

        "WorkflowInspector",

        "WorkflowDocumentationGenerator",

        "WorkflowOptimizer",

        "WorkflowComparator"

    }

    def analyze(
        self,
        nodes,
        links,
        architecture_analysis=None
    ):

        filtered_nodes = [

            node

            for node in nodes

            if node.get(
                "type",
                ""
            ) not in self.IGNORED_NODES

        ]

        total_nodes = len(
            filtered_nodes
        )

        total_links = len(
            links
        )

        category_counts = {}

        for node in filtered_nodes:

            node_type = node.get(
                "type",
                "Unknown"
            )

            category = (
                self.CATEGORY_MAP.get(
                    node_type,
                    "Other"
                )
            )

            category_counts[
                category
            ] = (
                category_counts.get(
                    category,
                    0
                )
                + 1
            )

        category_percentages = {}

        if total_nodes > 0:

            for category, count in category_counts.items():

                category_percentages[
                    category
                ] = round(
                    (
                        count /
                        total_nodes
                    )
                    * 100,
                    2
                )

        workflow_depth = 0
        longest_path = 0
        branch_count = 0
        disconnected_graphs = 0

        if architecture_analysis:

            workflow_depth = (
                architecture_analysis.get(
                    "workflow_depth",
                    0
                )
            )

            longest_path = (
                architecture_analysis.get(
                    "longest_path",
                    0
                )
            )

            branch_count = (
                architecture_analysis.get(
                    "branch_count",
                    0
                )
            )

            disconnected_graphs = (
                architecture_analysis.get(
                    "disconnected_graphs",
                    0
                )
            )

        largest_category = None

        if category_counts:

            largest_category = max(
                category_counts,
                key=category_counts.get
            )

        return {

            "total_nodes":
                total_nodes,

            "total_links":
                total_links,

            "categories":
                category_counts,

            "percentages":
                category_percentages,

            "largest_category":
                largest_category,

            "workflow_depth":
                workflow_depth,

            "longest_path":
                longest_path,

            "branch_count":
                branch_count,

            "disconnected_graphs":
                disconnected_graphs

        }