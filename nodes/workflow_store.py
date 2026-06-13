CURRENT_WORKFLOW = None


def set_workflow(
    workflow
):

    global CURRENT_WORKFLOW

    CURRENT_WORKFLOW = workflow


def get_workflow():

    return CURRENT_WORKFLOW