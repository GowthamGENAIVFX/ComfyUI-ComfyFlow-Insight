import {
    locateNode
}
from "./node_explorer.js";

export function buildBranchAnalyzer(
    branchData
)
{
    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.style.padding =
        "10px";

    const branchNodeCount =
        branchData?.branch_node_count ??
        0;

    const mergeNodeCount =
        branchData?.merge_node_count ??
        0;

    const parallelPaths =
        branchData?.parallel_paths ??
        0;

    const maxBranchWidth =
        branchData?.max_branch_width ??
        0;

    const connectedComponents =
        branchData?.connected_components ??
        0;

    const branchComplexity =
        branchData?.branch_complexity ??
        "Unknown";

    const branchScore =
        branchData?.branch_score ??
        0;

    let complexityColor =
        "#00cc66";

    if (
        branchComplexity === "Medium"
    )
    {
        complexityColor =
            "#ffaa00";
    }

    if (
        branchComplexity === "High"
    )
    {
        complexityColor =
            "#ff4444";
    }

    wrapper.innerHTML =
        `
        <h2>
            Branch Analyzer
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
                    Branch Nodes
                </h3>

                <h1>
                    ${branchNodeCount}
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
                    Merge Nodes
                </h3>

                <h1>
                    ${mergeNodeCount}
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
                    Parallel Paths
                </h3>

                <h1>
                    ${parallelPaths}
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
                    Max Branch Width
                </h3>

                <h1>
                    ${maxBranchWidth}
                </h1>
            </div>

        </div>

        <div
            style="
                background:#252526;
                border:1px solid #444;
                border-radius:10px;
                padding:15px;
                margin-bottom:20px;
            "
        >
            <h3>
                Branch Complexity
            </h3>

            <h2
                style="
                    color:${complexityColor};
                "
            >
                ${branchComplexity}
            </h2>

            <p>
                Score:
                ${branchScore}
            </p>

            <p>
                Connected Components:
                ${connectedComponents}
            </p>

        </div>
        `;

    const branchSection =
        document.createElement(
            "div"
        );

    branchSection.style.background =
        "#252526";

    branchSection.style.border =
        "1px solid #444";

    branchSection.style.borderRadius =
        "10px";

    branchSection.style.padding =
        "15px";

    branchSection.style.marginBottom =
        "20px";

    branchSection.innerHTML =
        `
        <h3>
            Branch Nodes
        </h3>
        `;

    const branchNodes =
        branchData?.branch_nodes ??
        [];

    if (
        branchNodes.length === 0
    )
    {
        branchSection.innerHTML +=
            `
            <p>
                No branch nodes detected.
            </p>
            `;
    }
    else
    {
        branchNodes.forEach(
            node =>
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
                    "10px";

                card.style.marginBottom =
                    "10px";

                card.innerHTML =
                    `
                    <b>
                        ${node.node_type}
                    </b>

                    <br>

                    Node ID:
                    ${node.node_id}

                    <br>

                    Outputs:
                    ${node.outputs}
                    `;

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
                            node.node_id
                        );
                    };

                card.appendChild(
                    locateButton
                );

                branchSection.appendChild(
                    card
                );
            }
        );
    }

    wrapper.appendChild(
        branchSection
    );

    const mergeSection =
        document.createElement(
            "div"
        );

    mergeSection.style.background =
        "#252526";

    mergeSection.style.border =
        "1px solid #444";

    mergeSection.style.borderRadius =
        "10px";

    mergeSection.style.padding =
        "15px";

    mergeSection.style.marginBottom =
        "20px";

    mergeSection.innerHTML =
        `
        <h3>
            Merge Nodes
        </h3>
        `;

    const mergeNodes =
        branchData?.merge_nodes ??
        [];

    if (
        mergeNodes.length === 0
    )
    {
        mergeSection.innerHTML +=
            `
            <p>
                No merge nodes detected.
            </p>
            `;
    }
    else
    {
        mergeNodes.forEach(
            node =>
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
                    "10px";

                card.style.marginBottom =
                    "10px";

                card.innerHTML =
                    `
                    <b>
                        ${node.node_type}
                    </b>

                    <br>

                    Node ID:
                    ${node.node_id}

                    <br>

                    Inputs:
                    ${node.inputs}
                    `;

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
                            node.node_id
                        );
                    };

                card.appendChild(
                    locateButton
                );

                mergeSection.appendChild(
                    card
                );
            }
        );
    }

    wrapper.appendChild(
        mergeSection
    );

    const insightSection =
        document.createElement(
            "div"
        );

    insightSection.style.background =
        "#252526";

    insightSection.style.border =
        "1px solid #444";

    insightSection.style.borderRadius =
        "10px";

    insightSection.style.padding =
        "15px";

    insightSection.innerHTML =
        `
        <h3>
            Branch Insights
        </h3>
        `;

    const insights =
        branchData?.insights ??
        [];

    const list =
        document.createElement(
            "ul"
        );

    insights.forEach(
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

    insightSection.appendChild(
        list
    );

    wrapper.appendChild(
        insightSection
    );

    return wrapper;
}