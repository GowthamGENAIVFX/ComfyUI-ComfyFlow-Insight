import {
    locateNode
}
from "./node_explorer.js";

export function buildDependencyGraph(
    dependencyData
)
{
    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.style.padding =
        "10px";

    const maxDependencies =
        dependencyData?.max_dependencies ??
        0;

    const maxDependents =
        dependencyData?.max_dependents ??
        0;

    const isolatedNodeCount =
        dependencyData?.isolated_node_count ??
        0;

    const dependencyComplexity =
        dependencyData?.dependency_complexity ??
        "Unknown";

    const dependencyScore =
        dependencyData?.dependency_score ??
        0;

    let complexityColor =
        "#00cc66";

    if (
        dependencyComplexity ===
        "Medium"
    )
    {
        complexityColor =
            "#ffaa00";
    }

    if (
        dependencyComplexity ===
        "High"
    )
    {
        complexityColor =
            "#ff4444";
    }

    wrapper.innerHTML =
        `
        <h2>
            Dependency Graph
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
                    Max Dependencies
                </h3>

                <h1>
                    ${maxDependencies}
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
                    Max Dependents
                </h3>

                <h1>
                    ${maxDependents}
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
                    Isolated Nodes
                </h3>

                <h1>
                    ${isolatedNodeCount}
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
                Dependency Complexity
            </h3>

            <h2
                style="
                    color:${complexityColor};
                "
            >
                ${dependencyComplexity}
            </h2>

            <p>
                Score:
                ${dependencyScore}
            </p>

        </div>
        `;

    const mostDependent =
        dependencyData?.most_dependent_node;

    const mostConnected =
        dependencyData?.most_connected_node;

    const createNodeCard =
        (
            title,
            node,
            type
        ) =>
        {
            const section =
                document.createElement(
                    "div"
                );

            section.style.background =
                "#252526";

            section.style.border =
                "1px solid #444";

            section.style.borderRadius =
                "10px";

            section.style.padding =
                "15px";

            section.style.marginBottom =
                "20px";

            section.innerHTML =
                `
                <h3>
                    ${title}
                </h3>
                `;

            if (!node)
            {
                section.innerHTML +=
                    `
                    <p>
                        No data available.
                    </p>
                    `;

                return section;
            }

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

            card.innerHTML =
                `
                <b>
                    ${node.node_type}
                </b>

                <br>

                Node ID:
                ${node.node_id}

                <br>

                ${
                    type === "dependency"
                    ?
                    `Dependencies: ${node.dependency_count}`
                    :
                    `Dependents: ${node.dependent_count}`
                }
                `;

            const button =
                document.createElement(
                    "button"
                );

            button.innerText =
                "Locate Node";

            button.style.marginTop =
                "10px";

            button.onclick =
                () =>
                {
                    locateNode(
                        node.node_id
                    );
                };

            card.appendChild(
                button
            );

            section.appendChild(
                card
            );

            return section;
        };

    wrapper.appendChild(

        createNodeCard(
            "Most Dependent Node",
            mostDependent,
            "dependency"
        )

    );

    wrapper.appendChild(

        createNodeCard(
            "Most Connected Node",
            mostConnected,
            "dependent"
        )

    );

    const isolatedSection =
        document.createElement(
            "div"
        );

    isolatedSection.style.background =
        "#252526";

    isolatedSection.style.border =
        "1px solid #444";

    isolatedSection.style.borderRadius =
        "10px";

    isolatedSection.style.padding =
        "15px";

    isolatedSection.style.marginBottom =
        "20px";

    isolatedSection.innerHTML =
        `
        <h3>
            Isolated Nodes
        </h3>
        `;

    const isolatedNodes =
        dependencyData?.isolated_nodes ??
        [];

    if (
        isolatedNodes.length === 0
    )
    {
        isolatedSection.innerHTML +=
            `
            <p>
                No isolated nodes detected.
            </p>
            `;
    }
    else
    {
        isolatedNodes.forEach(
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
                    `;

                const button =
                    document.createElement(
                        "button"
                    );

                button.innerText =
                    "Locate Node";

                button.style.marginTop =
                    "10px";

                button.onclick =
                    () =>
                    {
                        locateNode(
                            node.node_id
                        );
                    };

                card.appendChild(
                    button
                );

                isolatedSection.appendChild(
                    card
                );
            }
        );
    }

    wrapper.appendChild(
        isolatedSection
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
            Dependency Insights
        </h3>
        `;

    const list =
        document.createElement(
            "ul"
        );

    const insights =
        dependencyData?.insights ??
        [];

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

    insightsSection.appendChild(
        list
    );

    wrapper.appendChild(
        insightsSection
    );

    return wrapper;
}