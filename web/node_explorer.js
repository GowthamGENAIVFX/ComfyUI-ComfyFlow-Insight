import { app }
from "../../scripts/app.js";

if (
    !window.__comfyflowHighlightPatch
)
{
    window.__comfyflowHighlightPatch =
        true;

    const originalDrawNode =
        LGraphCanvas.prototype.drawNode;

    LGraphCanvas.prototype.drawNode =
        function(
            node,
            ctx
        )
        {
            originalDrawNode.call(
                this,
                node,
                ctx
            );

            if (
                node &&
                node.__comfyflowHighlight
            )
            {
                ctx.save();

                const pulse =
                    (
                        Math.sin(
                            Date.now() /
                            150
                        ) + 1
                    ) / 2;

                ctx.strokeStyle =
                    `rgba(
                        255,
                        255,
                        0,
                        ${0.5 + pulse * 0.5}
                    )`;

                ctx.lineWidth =
                    8;

                ctx.strokeRect(
                    node.pos[0] - 12,
                    node.pos[1] - 12,
                    node.size[0] + 24,
                    node.size[1] + 24
                );

                ctx.restore();
            }
        };
}

export function locateNode(
    nodeId
)
{
    const target =
        app.graph._nodes.find(
            node =>
                node.id === nodeId
        );

    if (!target)
    {
        alert(
            "Node not found."
        );

        return;
    }

    try
    {
        if (
            app.canvas.selectNode
        )
        {
            app.canvas.selectNode(
                target
            );
        }

        if (
            target.pos
        )
        {
            app.canvas.ds.offset[0] =
                -target.pos[0] + 600;

            app.canvas.ds.offset[1] =
                -target.pos[1] + 350;
        }

        app.canvas.ds.scale =
            1.2;

        target.__comfyflowHighlight =
            true;

        app.canvas.setDirty(
            true,
            true
        );

        setTimeout(
            () =>
            {
                target.__comfyflowHighlight =
                    false;

                app.canvas.setDirty(
                    true,
                    true
                );
            },
            3000
        );
    }
    catch(error)
    {
        console.error(
            "Locate Node Error:",
            error
        );
    }
}

function safeArray(
    value
)
{
    if (
        Array.isArray(
            value
        )
    )
    {
        return value;
    }

    return [];
}

function safePosition(
    value
)
{
    if (
        Array.isArray(
            value
        ) &&
        value.length >= 2
    )
    {
        return value;
    }

    return [0, 0];
}

function createList(
    values
)
{
    const list =
        document.createElement(
            "ul"
        );

    safeArray(
        values
    ).forEach(
        value =>
        {
            const item =
                document.createElement(
                    "li"
                );

            item.innerText =
                String(
                    value
                );

            list.appendChild(
                item
            );
        }
    );

    if (
        list.children.length === 0
    )
    {
        const item =
            document.createElement(
                "li"
            );

        item.innerText =
            "None";

        list.appendChild(
            item
        );
    }

    return list;
}

function createWidgetList(
    widgetValues
)
{
    const list =
        document.createElement(
            "ul"
        );

    if (
        Array.isArray(
            widgetValues
        )
    )
    {
        widgetValues.forEach(
            value =>
            {
                const item =
                    document.createElement(
                        "li"
                    );

                item.innerText =
                    String(
                        value
                    );

                list.appendChild(
                    item
                );
            }
        );
    }
    else if (
        widgetValues !== null &&
        widgetValues !== undefined
    )
    {
        const item =
            document.createElement(
                "li"
            );

        item.innerText =
            JSON.stringify(
                widgetValues
            );

        list.appendChild(
            item
        );
    }
    else
    {
        const item =
            document.createElement(
                "li"
            );

        item.innerText =
            "No widget values";

        list.appendChild(
            item
        );
    }

    return list;
}

function createNodeCard(
    node
)
{
    const card =
        document.createElement(
            "div"
        );

    card.style.border =
        "1px solid #444";

    card.style.padding =
        "15px";

    card.style.marginBottom =
        "15px";

    card.style.borderRadius =
        "8px";

    card.style.background =
        "#252526";

    const position =
        safePosition(
            node.position
        );

    const size =
        safePosition(
            node.size
        );

    card.innerHTML =
        `
        <h2>
            ${node.type || "Unknown Node"}
        </h2>

        <p>
            <b>Category:</b>
            ${node.category || "Unknown"}
        </p>

        <p>
            <b>Execution Order:</b>
            ${node.execution_order ?? 0}
        </p>

        <p>
            <b>Node ID:</b>
            ${node.id ?? "Unknown"}
        </p>

        <p>
            <b>Position:</b>
            X=${Math.round(position[0])}
            Y=${Math.round(position[1])}
        </p>

        <p>
            <b>Size:</b>
            ${Math.round(size[0])}
            x
            ${Math.round(size[1])}
        </p>
        `;

    const inputTitle =
        document.createElement(
            "h4"
        );

    inputTitle.innerText =
        "Input Ports";

    card.appendChild(
        inputTitle
    );

    card.appendChild(
        createList(
            node.input_names
        )
    );

    const outputTitle =
        document.createElement(
            "h4"
        );

    outputTitle.innerText =
        "Output Ports";

    card.appendChild(
        outputTitle
    );

    card.appendChild(
        createList(
            node.output_names
        )
    );

    const widgetTitle =
        document.createElement(
            "h4"
        );

    widgetTitle.innerText =
        "Widget Values";

    card.appendChild(
        widgetTitle
    );

    card.appendChild(
        createWidgetList(
            node.widget_values
        )
    );

    const locateButton =
        document.createElement(
            "button"
        );

    locateButton.innerText =
        "Locate Node";

    locateButton.style.marginTop =
        "10px";

    locateButton.onclick =
        () =>
        {
            locateNode(
                node.id
            );
        };

    card.appendChild(
        locateButton
    );

    return card;
}

export function buildNodeExplorer(
    nodes
)
{
    const wrapper =
        document.createElement(
            "div"
        );

    const searchBox =
        document.createElement(
            "input"
        );

    searchBox.placeholder =
        "Search nodes...";

    searchBox.style.width =
        "100%";

    searchBox.style.padding =
        "10px";

    searchBox.style.marginBottom =
        "20px";

    wrapper.appendChild(
        searchBox
    );

    const results =
        document.createElement(
            "div"
        );

    wrapper.appendChild(
        results
    );

    function renderNodes(
        filter = ""
    )
    {
        results.innerHTML =
            "";

        const filtered =
            safeArray(
                nodes
            ).filter(
                node =>
                    String(
                        node.type || ""
                    )
                    .toLowerCase()
                    .includes(
                        filter
                        .toLowerCase()
                    )
            );

        filtered.forEach(
            node =>
            {
                results.appendChild(
                    createNodeCard(
                        node
                    )
                );
            }
        );
    }

    searchBox.addEventListener(
        "input",
        function()
        {
            renderNodes(
                this.value
            );
        }
    );

    renderNodes();

    return wrapper;
}