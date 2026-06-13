import {
    locateNode
}
from "./node_explorer.js";

function selectNode(
    nodeId
)
{
    const graph =
        app.graph;

    const node =
        graph._nodes.find(
            n =>
                n.id === nodeId
        );

    if (!node)
    {
        return;
    }

    if (
        app.canvas.selectNode
    )
    {
        app.canvas.selectNode(
            node
        );
    }

    app.canvas.centerOnNode(
        node
    );
}

function zoomToNode(
    nodeId
)
{
    const graph =
        app.graph;

    const node =
        graph._nodes.find(
            n =>
                n.id === nodeId
        );

    if (!node)
    {
        return;
    }

    app.canvas.centerOnNode(
        node
    );

    app.canvas.ds.scale =
        1.5;

    app.canvas.setDirty(
        true,
        true
    );
}

export function buildWorkflowActions(
    actionsData
)
{
    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.style.padding =
        "12px";

    const summary =
        actionsData?.summary ||
        {};

    wrapper.innerHTML =
        `
        <h2>
            Workflow Actions
        </h2>

        <div
            style="
                display:grid;
                grid-template-columns:
                    repeat(
                        auto-fit,
                        minmax(
                            220px,
                            1fr
                        )
                    );
                gap:12px;
                margin-bottom:20px;
            "
        >

            <div
                style="
                    background:#252526;
                    border:1px solid #444;
                    border-radius:10px;
                    padding:15px;
                "
            >
                <h3>
                    Total Nodes
                </h3>

                <h1>
                    ${
                        summary.total_nodes
                        || 0
                    }
                </h1>
            </div>

            <div
                style="
                    background:#252526;
                    border:1px solid #444;
                    border-radius:10px;
                    padding:15px;
                "
            >
                <h3>
                    Actionable Nodes
                </h3>

                <h1>
                    ${
                        summary.actionable_nodes
                        || 0
                    }
                </h1>
            </div>

        </div>
        `;

    const actionsSection =
        document.createElement(
            "div"
        );

    actionsSection.style.background =
        "#252526";

    actionsSection.style.border =
        "1px solid #444";

    actionsSection.style.borderRadius =
        "10px";

    actionsSection.style.padding =
        "15px";

    actionsSection.style.marginBottom =
        "20px";

    actionsSection.innerHTML =
        `
        <h3>
            Node Actions
        </h3>
        `;

    const actions =
        actionsData?.actions ||
        [];

    actions.forEach(
        item =>
        {
            const card =
                document.createElement(
                    "div"
                );

            card.style.border =
                "1px solid #555";

            card.style.borderRadius =
                "8px";

            card.style.padding =
                "12px";

            card.style.marginBottom =
                "12px";

            card.innerHTML =
                `
                <h4>
                    ${item.node_type}
                </h4>

                <p>
                    <b>Node ID:</b>
                    ${item.node_id}
                </p>

                <p>
                    <b>Dependencies:</b>
                    ${item.dependency_count}
                </p>

                <p>
                    <b>Dependents:</b>
                    ${item.dependent_count}
                </p>
                `;

            const locateButton =
                document.createElement(
                    "button"
                );

            locateButton.innerText =
                "Locate";

            locateButton.onclick =
                () =>
                {
                    locateNode(
                        item.node_id
                    );
                };

            card.appendChild(
                locateButton
            );

            const selectButton =
                document.createElement(
                    "button"
                );

            selectButton.innerText =
                "Select";

            selectButton.style.marginLeft =
                "10px";

            selectButton.onclick =
                () =>
                {
                    selectNode(
                        item.node_id
                    );
                };

            card.appendChild(
                selectButton
            );

            const zoomButton =
                document.createElement(
                    "button"
                );

            zoomButton.innerText =
                "Zoom";

            zoomButton.style.marginLeft =
                "10px";

            zoomButton.onclick =
                () =>
                {
                    zoomToNode(
                        item.node_id
                    );
                };

            card.appendChild(
                zoomButton
            );

            actionsSection.appendChild(
                card
            );
        }
    );

    wrapper.appendChild(
        actionsSection
    );

    const insightsSection =
        document.createElement(
            "div"
        );

    insightsSection.style.background =
        "#252526";

    insightsSection.style.border =
        "1px solid #444";

    insightsSection.style.borderRadius =
        "10px";

    insightsSection.style.padding =
        "15px";

    insightsSection.innerHTML =
        `
        <h3>
            Action Insights
        </h3>
        `;

    const list =
        document.createElement(
            "ul"
        );

    (
        actionsData?.insights ||
        []
    )
    .forEach(
        insight =>
        {
            const item =
                document.createElement(
                    "li"
                );

            item.innerText =
                insight;

            list.appendChild(
                item
            );
        }
    );

    insightsSection.appendChild(
        list
    );

    wrapper.appendChild(
        insightsSection
    );

    return wrapper;
}