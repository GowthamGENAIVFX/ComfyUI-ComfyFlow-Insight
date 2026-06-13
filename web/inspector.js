import { app }
from "../../scripts/app.js";

import {
    showDashboard
}
from "./dashboard.js";

const COMFYFLOW_NODES = [

    "WorkflowInspector",

    "WorkflowDocumentationGenerator",

    "WorkflowOptimizer",

    "WorkflowComparator"

];

app.registerExtension({

    name:
    "ComfyFlow.Inspector",

    async beforeRegisterNodeDef(
        nodeType,
        nodeData
    )
    {

        if (
            nodeData.name !==
            "WorkflowInspector"
        )
        {
            return;
        }

        const original =
            nodeType.prototype
            .onNodeCreated;

        nodeType.prototype
        .onNodeCreated =
        function ()
        {

            original?.apply(
                this,
                arguments
            );

            this.addWidget(

                "button",

                "Generate Documentation",

                null,

                async () =>
                {

                    const workflow =
                        app.graph.serialize();

                    workflow.nodes =
                        workflow.nodes.filter(
                            node =>
                                !COMFYFLOW_NODES
                                .includes(
                                    node.type
                                )
                        );

                    const response =
                        await fetch(
                            "/comfyflow/analyze",
                            {
                                method:
                                    "POST",

                                headers:
                                {
                                    "Content-Type":
                                    "application/json"
                                },

                                body:
                                JSON.stringify(
                                    workflow
                                )
                            }
                        );

                    const result =
                        await response.json();

                    showDashboard(
                        result
                    );

                }

            );

        };

    }

});