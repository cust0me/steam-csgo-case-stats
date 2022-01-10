var timeoutHandle = null;
var triesWhereLoadButtonIsHidden = 0;

function AddNewRow() {
    var BottomSection = document.getElementsByClassName('load_more_history_area')[0];
    BottomSection.appendChild(document.createElement("br"));
    BottomSection.appendChild(document.createElement("br"));
}

function AddButton( title, callback ) {
    var BottomSection = document.getElementsByClassName('load_more_history_area')[0];

    var link = document.createElement("a");
    link.onclick = callback;

    var link_div = document.createElement("div");
    link_div.className = 'btnv6_blue_hoverfade btn_medium';
    link_div.style = 'display: inline-block; margin: 5px;';
    link_div.textContent = title;

    link.appendChild(link_div);
    BottomSection.appendChild(link);
}

function AddNewParagraph(text) {
    var BottomSection = document.getElementsByClassName('load_more_history_area')[0];

    var paragraphElement = document.createElement("p");
    paragraphElement.innerHTML = text;

    BottomSection.appendChild(paragraphElement);
    return paragraphElement;
}

function FetchHistory() {
    var LoadButton = document.getElementById('load_more_button');
    if( LoadButton.style.display == "none" ) {
        triesWhereLoadButtonIsHidden += 1;

        if(triesWhereLoadButtonIsHidden > 3) {
            AddNewParagraph("Finished fetching data!");
            SumTotalAmountOfCases();
            return;
        }

        timeoutHandle = setTimeout(FetchHistory, 3500);
        return;
    }

    triesWhereLoadButtonIsHidden = 0;
    LoadButton.click();

    timeoutHandle = setTimeout(FetchHistory, 3500);
}

function StopFetchingHistory() {
    window.clearTimeout(timeoutHandle);
}

function SumTotalAmountOfCases() {
    var totalCasesOpened = 0;
    var totalCapsulesOpened = 0;
    var totalPatchesOpened = 0;

    var historyEventDescriptions = document.getElementsByClassName("tradehistory_event_description");
    for (i = 0; i < historyEventDescriptions.length; i++) {
        if(historyEventDescriptions[i].textContent.trim() == "Unlocked a container") {
            var parentElement = historyEventDescriptions[i].parentElement;
            if(parentElement.children[1].innerHTML.includes("Capsule"))
                totalCapsulesOpened += 1;
            else
            {
                if(parentElement.children[1].innerHTML.includes("Patch"))
                    totalPatchesOpened += 1;
                else
                    totalCasesOpened += 1;
            }
        }
    }

    TotalCasesText.innerHTML = "Total cases: " + totalCasesOpened;
    TotalCapsulesText.innerHTML = "Total capsules: " + totalCapsulesOpened;
    TotalPatchesText.innerHTML = "Total patches: " + totalPatchesOpened;
}

AddNewRow();
AddButton("Start fetching history", FetchHistory);
AddButton("Stop fetching history", StopFetchingHistory);
AddButton("Sum total amount of cases", SumTotalAmountOfCases);
let TotalCasesText = AddNewParagraph("Total cases: 0");
let TotalCapsulesText = AddNewParagraph("Total capsules: 0");
let TotalPatchesText = AddNewParagraph("Total patches: 0");
