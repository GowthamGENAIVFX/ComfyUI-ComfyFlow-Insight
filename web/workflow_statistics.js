export function buildWorkflowStatistics(
    statistics
)
{
    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.style.padding =
        "10px";

    const totalNodes =
        statistics?.total_nodes ??
        0;

    const totalLinks =
        statistics?.total_links ??
        0;

    const workflowDepth =
        statistics?.workflow_depth ??
        0;

    const longestPath =
        statistics?.longest_path ??
        0;

    const branchCount =
        statistics?.branch_count ??
        0;

    const disconnectedGraphs =
        statistics?.disconnected_graphs ??
        0;

    const largestCategory =
        statistics?.largest_category ??
        "N/A";

    wrapper.innerHTML =
        `
        <h2>
            Workflow Statistics
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
                    ${totalNodes}
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
                    Total Links
                </h3>

                <h1>
                    ${totalLinks}
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
                    Workflow Depth
                </h3>

                <h1>
                    ${workflowDepth}
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
                    Longest Path
                </h3>

                <h1>
                    ${longestPath}
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
                    Branch Count
                </h3>

                <h1>
                    ${branchCount}
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
                    Disconnected Graphs
                </h3>

                <h1>
                    ${disconnectedGraphs}
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
                Largest Category
            </h3>

            <p>
                ${largestCategory}
            </p>
        </div>
        `;

    const categorySection =
        document.createElement(
            "div"
        );

    categorySection.style.background =
        "#252526";

    categorySection.style.border =
        "1px solid #444";

    categorySection.style.borderRadius =
        "10px";

    categorySection.style.padding =
        "15px";

    categorySection.style.marginBottom =
        "20px";

    const categoryTitle =
        document.createElement(
            "h3"
        );

    categoryTitle.innerText =
        "Node Categories";

    categorySection.appendChild(
        categoryTitle
    );

    const categories =
        statistics?.categories ??
        {};

    const percentages =
        statistics?.percentages ??
        {};

    if (
        Object.keys(
            categories
        ).length === 0
    )
    {
        const empty =
            document.createElement(
                "p"
            );

        empty.innerText =
            "No category data available.";

        categorySection.appendChild(
            empty
        );
    }
    else
    {
        Object.entries(
            categories
        ).forEach(
            (
                [
                    category,
                    count
                ]
            ) =>
            {
                const row =
                    document.createElement(
                        "div"
                    );

                row.style.marginBottom =
                    "12px";

                const percentage =
                    percentages[
                        category
                    ] ?? 0;

                row.innerHTML =
                    `
                    <div
                        style="
                            display:flex;
                            justify-content:space-between;
                            margin-bottom:4px;
                        "
                    >
                        <span>
                            ${category}
                        </span>

                        <span>
                            ${count}
                            (
                            ${percentage}%
                            )
                        </span>
                    </div>

                    <div
                        style="
                            background:#111;
                            border-radius:5px;
                            overflow:hidden;
                            height:18px;
                        "
                    >
                        <div
                            style="
                                width:${percentage}%;
                                background:#4CAF50;
                                height:18px;
                            "
                        >
                        </div>
                    </div>
                    `;

                categorySection.appendChild(
                    row
                );
            }
        );
    }

    wrapper.appendChild(
        categorySection
    );

    const metricsSection =
        document.createElement(
            "div"
        );

    metricsSection.style.background =
        "#252526";

    metricsSection.style.border =
        "1px solid #444";

    metricsSection.style.borderRadius =
        "10px";

    metricsSection.style.padding =
        "15px";

    metricsSection.innerHTML =
        `
        <h3>
            Architecture Metrics
        </h3>

        <ul>
            <li>
                Workflow Depth:
                ${workflowDepth}
            </li>

            <li>
                Longest Path:
                ${longestPath}
            </li>

            <li>
                Branch Count:
                ${branchCount}
            </li>

            <li>
                Disconnected Graphs:
                ${disconnectedGraphs}
            </li>
        </ul>
        `;

    wrapper.appendChild(
        metricsSection
    );

    return wrapper;
}