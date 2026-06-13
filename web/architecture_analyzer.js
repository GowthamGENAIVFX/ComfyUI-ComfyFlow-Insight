import {
    locateNode
}
from "./node_explorer.js";

function createSectionTitle(
    title
)
{
    const element =
        document.createElement(
            "h3"
        );

    element.innerText =
        title;

    element.style.marginTop =
        "20px";

    return element;
}

function createNodeList(
    title,
    nodes
)
{
    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.appendChild(
        createSectionTitle(
            title
        )
    );

    const list =
        document.createElement(
            "ul"
        );

    if (
        !nodes ||
        nodes.length === 0
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
    else
    {
        nodes.forEach(
            node =>
            {
                const item =
                    document.createElement(
                        "li"
                    );

                const text =
                    document.createElement(
                        "span"
                    );

                text.innerText =
                    `${node.type} (ID: ${node.id})`;

                item.appendChild(
                    text
                );

                const button =
                    document.createElement(
                        "button"
                    );

                button.innerText =
                    " Locate ";

                button.style.marginLeft =
                    "10px";

                button.style.cursor =
                    "pointer";

                button.onclick =
                    () =>
                    {
                        locateNode(
                            node.id
                        );
                    };

                item.appendChild(
                    button
                );

                list.appendChild(
                    item
                );
            }
        );
    }

    wrapper.appendChild(
        list
    );

    return wrapper;
}

function createInsightCard(
    insight
)
{
    const card =
        document.createElement(
            "div"
        );

    card.style.border =
        "1px solid #444";

    card.style.borderRadius =
        "8px";

    card.style.padding =
        "10px";

    card.style.marginBottom =
        "10px";

    card.style.background =
        "#252526";

    card.innerHTML =
        `
        <p>
            ✓ ${insight}
        </p>
        `;

    return card;
}

function createArchitectureTree(
    paths
)
{
    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.appendChild(
        createSectionTitle(
            "Workflow Paths"
        )
    );

    if (
        !paths ||
        paths.length === 0
    )
    {
        wrapper.innerHTML +=
            `
            <p>
                No workflow paths detected.
            </p>
            `;

        return wrapper;
    }

    paths.forEach(
        (
            path,
            index
        ) =>
        {
            const card =
                document.createElement(
                    "div"
                );

            card.style.border =
                "1px solid #444";

            card.style.borderRadius =
                "8px";

            card.style.padding =
                "15px";

            card.style.marginBottom =
                "15px";

            card.style.background =
                "#252526";

            let html =
                `
                <h4>
                    Path ${index + 1}
                </h4>
                `;

            path.forEach(
                (
                    node,
                    nodeIndex
                ) =>
                {
                    html +=
                        `
                        <div>
                            ${node}
                        </div>
                        `;

                    if (
                        nodeIndex <
                        path.length - 1
                    )
                    {
                        html +=
                            `
                            <div>
                                ↓
                            </div>
                            `;
                    }
                }
            );

            card.innerHTML =
                html;

            wrapper.appendChild(
                card
            );
        }
    );

    return wrapper;
}

export function buildArchitectureAnalyzer(
    architectureData,
    mermaidDiagram
)
{
    const wrapper =
        document.createElement(
            "div"
        );

    const healthColor =
        architectureData.health ===
        "Healthy"
            ? "#00cc66"
            : architectureData.health ===
              "Warning"
            ? "#ffaa00"
            : "#ff4444";

    wrapper.innerHTML =
        `
        <h2>
            Architecture Analyzer
        </h2>

        <div
            style="
                border:1px solid #444;
                border-radius:10px;
                padding:20px;
                background:#252526;
                margin-bottom:20px;
            "
        >

            <h1
                style="
                    color:${healthColor};
                    margin:0;
                "
            >
                ${architectureData.health}
            </h1>

            <p>
                <b>Workflow Depth:</b>
                ${architectureData.workflow_depth}
            </p>

            <p>
                <b>Longest Path:</b>
                ${architectureData.longest_path}
            </p>

            <p>
                <b>Branch Count:</b>
                ${architectureData.branch_count}
            </p>

            <p>
                <b>Disconnected Graphs:</b>
                ${architectureData.disconnected_graphs}
            </p>

        </div>
        `;

    wrapper.appendChild(
        createNodeList(
            "Entry Nodes",
            architectureData.entry_nodes
        )
    );

    wrapper.appendChild(
        createNodeList(
            "Exit Nodes",
            architectureData.exit_nodes
        )
    );

    const insightTitle =
        createSectionTitle(
            "Architecture Insights"
        );

    wrapper.appendChild(
        insightTitle
    );

    (
        architectureData.insights
        || []
    ).forEach(
        insight =>
        {
            wrapper.appendChild(
                createInsightCard(
                    insight
                )
            );
        }
    );

    wrapper.appendChild(
        createArchitectureTree(
            architectureData.architecture_tree
        )
    );

    const mermaidTitle =
        createSectionTitle(
            "Mermaid Diagram"
        );

    wrapper.appendChild(
        mermaidTitle
    );

    const diagram =
        document.createElement(
            "pre"
        );

    diagram.style.border =
        "1px solid #444";

    diagram.style.borderRadius =
        "8px";

    diagram.style.padding =
        "15px";

    diagram.style.background =
        "#1e1e1e";

    diagram.style.overflow =
        "auto";

    diagram.innerText =
        mermaidDiagram ||
        "No diagram available";

    wrapper.appendChild(
        diagram
    );

    return wrapper;
}