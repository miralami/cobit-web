# docx-report

Edit and generate Word (.docx) documents directly using python-docx.

## When to use

- User asks to write, edit, or update a report/paper in Word format
- User asks to modify an existing .docx file
- User asks to create documentation as a .docx file
- Adding content, sections, or formatting to existing Word documents

## Output location

**Primary report directory:** `C:\Users\Afif\OneDrive\Kuliah\Semester 7\metopen`

All generated or edited .docx files should be saved here unless the user specifies a different path.

**Template:** `C:\Users\Afif\OneDrive\Kuliah\Semester 7\metopen\Template Metopen Draft.docx`
- Use this as a reference for formatting, styles, and structure
- When generating new reports, match the template's heading styles, font, and spacing

## How to edit docx

Use **python-docx** (already installed, v1.2.0) to directly read, modify, and write .docx files.

### Workflow

1. **Write a Python script** that opens the target .docx file, makes changes, and saves
2. **Run the script** with `python script.py`
3. **Clean up** — remove the temp script after successful execution

### Basic patterns

```python
from docx import Document

# Open existing document
doc = Document(r"C:\Users\Afif\OneDrive\Kuliah\Semester 7\metopen\file.docx")

# Read paragraphs
for para in doc.paragraphs:
    print(para.text)

# Add a new paragraph
doc.add_paragraph("New content here")

# Add a heading
doc.add_heading("Section Title", level=1)

# Add a table
table = doc.add_table(rows=2, cols=3)
table.cell(0, 0).text = "Header"

# Modify existing paragraph
for para in doc.paragraphs:
    if "old text" in para.text:
        para.text = para.text.replace("old text", "new text")

# Save (overwrite or save as new)
doc.save(r"C:\Users\Afif\OneDrive\Kuliah\Semester 7\metopen\file.docx")
```

### Editing existing content

```python
from docx import Document

doc = Document(path)

# Find and replace text across all paragraphs
for para in doc.paragraphs:
    for run in para.runs:
        if "search text" in run.text:
            run.text = run.text.replace("search text", "replacement")

# Find and replace in tables too
for table in doc.tables:
    for row in table.rows:
        for cell in row.cells:
            for para in cell.paragraphs:
                for run in para.runs:
                    if "search" in run.text:
                        run.text = run.text.replace("search", "replacement")

doc.save(path)
```

### Working with styles

```python
from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

doc = Document(path)

# Apply heading styles
doc.add_heading("Chapter 1", level=1)
doc.add_heading("Section 1.1", level=2)

# Custom formatting
para = doc.add_paragraph()
run = para.add_run("Formatted text")
run.bold = True
run.font.size = Pt(12)
run.font.color.rgb = RGBColor(0, 0, 0)

# Alignment
para.alignment = WD_ALIGN_PARAGRAPH.CENTER

# Page margins (for new sections)
from docx.shared import Cm
section = doc.sections[0]
section.top_margin = Cm(2.54)
section.bottom_margin = Cm(2.54)
section.left_margin = Cm(2.54)
section.right_margin = Cm(2.54)
```

### Creating a new document from template

```python
from docx import Document

# Open template as base
doc = Document(r"C:\Users\Afif\OneDrive\Kuliah\Semester 7\metopen\Template Metopen Draft.docx")

# Clear existing content if needed (keep styles)
# Or just append new content
doc.add_heading("New Report", level=1)
doc.add_paragraph("Report content...")

# Save as new file
doc.save(r"C:\Users\Afif\OneDrive\Kuliah\Semester 7\metopen\New Report.docx")
```

## Formatting guidelines

- Follow the template's heading hierarchy (Heading 1 for chapters, Heading 2 for sections)
- Use Indonesian (Bahasa Indonesia) for report content unless user specifies otherwise
- Include page numbers, proper margins, and academic formatting
- Tables and figures should be captioned
- References section at the end, formatted consistently
- Match the template's font (likely Times New Roman or Calibri) and size (12pt)
