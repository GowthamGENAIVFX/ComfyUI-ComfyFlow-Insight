export function buildExportCenter(
    exportData
)
{
    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.style.padding =
        "12px";

    const summary =
        exportData?.export_summary ||
        {};

    wrapper.innerHTML =
        `
        <h2>
            Export Center
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
                    Total Links
                </h3>

                <h1>
                    ${
                        summary.total_links
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
                    Workflow Grade
                </h3>

                <h1>
                    ${
                        summary.workflow_grade
                        || "N/A"
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
                    Health Score
                </h3>

                <h1>
                    ${
                        summary.health_score
                        || 0
                    }
                </h1>
            </div>

        </div>
        `;

    function createReportCard(
        title,
        content
    )
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

        const heading =
            document.createElement(
                "h3"
            );

        heading.innerText =
            title;

        section.appendChild(
            heading
        );

        const pre =
            document.createElement(
                "pre"
            );

        pre.style.whiteSpace =
            "pre-wrap";

        pre.style.wordBreak =
            "break-word";

        pre.style.background =
            "#1e1e1e";

        pre.style.padding =
            "12px";

        pre.style.borderRadius =
            "8px";

        pre.style.border =
            "1px solid #333";

        pre.innerText =
            content ||
            "No data available.";

        section.appendChild(
            pre
        );

        const copyButton =
            document.createElement(
                "button"
            );

        copyButton.innerText =
            "Copy Report";

        copyButton.style.marginTop =
            "10px";

        copyButton.onclick =
            async () =>
            {
                try
                {
                    await navigator
                        .clipboard
                        .writeText(
                            content
                        );

                    alert(
                        "Report copied to clipboard."
                    );
                }
                catch
                {
                    alert(
                        "Failed to copy report."
                    );
                }
            };

        section.appendChild(
            copyButton
        );

        return section;
    }

    wrapper.appendChild(
        createReportCard(
            "Architecture Report",
            exportData
                ?.architecture_report
        )
    );

    wrapper.appendChild(
        createReportCard(
            "Optimization Report",
            exportData
                ?.optimization_report
        )
    );

    wrapper.appendChild(
        createReportCard(
            "Repair Report",
            exportData
                ?.repair_report
        )
    );

    wrapper.appendChild(
        createReportCard(
            "Portfolio Report",
            exportData
                ?.portfolio_report
        )
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
            Export Insights
        </h3>
        `;

    const list =
        document.createElement(
            "ul"
        );

    (
        exportData?.insights ||
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