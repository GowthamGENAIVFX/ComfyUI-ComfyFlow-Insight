class WorkflowInspector:

    @classmethod
    def INPUT_TYPES(cls):

        return {
            "required": {}
        }

    RETURN_TYPES = (
        "STRING",
    )

    RETURN_NAMES = (
        "status",
    )

    FUNCTION = "inspect"

    CATEGORY = "ComfyFlow Insight"

    def inspect(self):

        return (
            "ComfyFlow Insight Ready",
        )


NODE_CLASS_MAPPINGS = {

    "WorkflowInspector":
        WorkflowInspector

}

NODE_DISPLAY_NAME_MAPPINGS = {

    "WorkflowInspector":
        "Workflow Inspector"

}