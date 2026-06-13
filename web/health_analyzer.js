export function buildHealthAnalyzer(
    data
)
{
    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.innerHTML =
        `
        <h2>
            Workflow Health
        </h2>

        <h1>
            Score:
            ${data.score}/100
        </h1>
        `;

    const list =
        document.createElement(
            "ul"
        );

    (data.warnings || [])
    .forEach(
        warning =>
        {
            const item =
                document.createElement(
                    "li"
                );

            item.innerText =
                warning;

            list.appendChild(
                item
            );
        }
    );

    wrapper.appendChild(
        list
    );

    return wrapper;
}