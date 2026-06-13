from pathlib import Path


class FileExporter:

    def export(
        self,
        readme,
        diagram,
        node_explanations,
        optimization_notes
    ):

        docs_folder = (
            Path(__file__).parent.parent
            / "docs"
        )

        docs_folder.mkdir(
            exist_ok=True
        )

        readme_file = (
            docs_folder
            / "README.md"
        )

        diagram_file = (
            docs_folder
            / "architecture-diagram.md"
        )

        node_file = (
            docs_folder
            / "node-explanations.md"
        )

        optimization_file = (
            docs_folder
            / "optimization-notes.md"
        )

        readme_file.write_text(
            readme,
            encoding="utf-8"
        )

        diagram_file.write_text(
            diagram,
            encoding="utf-8"
        )

        node_file.write_text(
            node_explanations,
            encoding="utf-8"
        )

        optimization_file.write_text(
            optimization_notes,
            encoding="utf-8"
        )

        return str(
            docs_folder
        )