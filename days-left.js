const COLUMNS = 20;
const ROWS = 365 / COLUMNS;
const PADDING = 8
const CELL_SIZE = 4
const WP = 24;

const widget = new ListWidget();
widget.setPadding(WP, WP, WP, WP);
widget.backgroundColor = new Color("#fffff")

const year = new Date().getFullYear()
const dayOfYear = Math.floor((new Date() - new Date(year, 0, 0)) / 86400000);

for (let row = 0; row < ROWS; row++) {
    const rowStack = widget.addStack();
    rowStack.layoutHorizontally();

    for (let col = 0; col < COLUMNS; col++) {
        const thisDay = row * COLUMNS + col;
        var thisCell = dayOfYear > thisDay ? 1 : 0.4;

        if (thisDay >= 365) thisCell = 0;

        const boxStack = rowStack.addStack();
        boxStack.backgroundColor = new Color("#ffffff", thisCell);
        boxStack.cornerRadius = CELL_SIZE;
        boxStack.size = new Size(CELL_SIZE, CELL_SIZE);

        if (col < COLUMNS - 1) {
            rowStack.addSpacer()
        }
    }

    widget.addStack(rowStack);
    if (row < ROWS - 1) {
        widget.addSpacer(PADDING);
    }
}

widget.addSpacer(20)
const font = new Font("Menlo", 14)
const textRow = widget.addStack();
textRow.spacing = 10;
textRow.layoutHorizontally();

const yearText = textRow.addText(year.toString())
yearText.font = font
textRow.addSpacer()

const daysLeftGroup = textRow.addStack()
daysLeftGroup.layoutHorizontally()

const nDaysLeft = daysLeftGroup.addText((365 - dayOfYear).toString())
nDaysLeft.font = font

const daysLeft = daysLeftGroup.addText(" days left")
daysLeft.font = font
daysLeft.textColor = new Color("#ffffff", 0.4)

if (config.runsInWidget) {
    Script.setWidget(widget);
} else {
    widget.presentLarge();
}
Script.complete();