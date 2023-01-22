const { Grid } = require("ag-grid-community");
require('ag-grid-enterprise');
const csv = require('csvtojson');
const performDeskTest = require("../desk-test/execBackend");
const fs = require('fs');

class ShowOptions {
    init(params) {
        this.eGui = document.createElement('span');
        this.eGui.innerHTML = `${this.getValueToDisplay(params)}`;
    }

    getGui() {
        return this.eGui;
    }

    afterGuiAttached() {
        this.eGui.focus();
    }

    getValueToDisplay(params) {
        return params.valueFormatted ? params.valueFormatted : params.value;
    }

    refresh() {
        return false;
    }
}

class EnableSwitch {
    init(params) {
        this.params = params;
        this.eGui = document.createElement('input');
        this.eGui.type = 'checkBox'
        this.eGui.checked = params.value;
        // if (params.column.colId == 'Screenshot') this.eGui.checked = 'true';
        // else this.eGui.checked = params.value;
        if (params.column.colId == 'Enable Parameterized'){
            if(params.value){
                document.getElementById('btn-para').disabled = false;
                document.getElementById('csv-link').focus();
            }
        } 
        this.btnClickedHandler = this.btnClickedHandler.bind(this);
        this.eGui.addEventListener('click', this.btnClickedHandler);
    }

    getGui() {
        return this.eGui;
    }

    btnClickedHandler(e) {
        let checked = e.target.checked;
        let colId = this.params.column.colId;
        this.params.node.setDataValue(colId, checked);
    }

    destroy() {
        this.eGui.removeEventListener('click', this.btnClickedHandler);
    }
}

module.exports = function () {
    let rowData = [];
    let variables = [];
    const columnDefsWin = [
        {
            field: "Step Number",
            valueGetter: (params) => {
                return params.node.rowIndex + 1
            },
            editable: false,
            checkboxSelection: true,
            headerCheckboxSelection: true
        },
        {
            field: "Step Description"
        },
        {
            field: "Action Types",
            editable: true,
            cellRenderer: ShowOptions,
            cellEditor: 'agRichSelectCellEditor',
            //cellEditor:'agSelectCellEditor',
            // cellEditorPopup: true,
            // cellEditorPopupPosition: 'under',
            cellEditorParams: {
                cellRenderer: ShowOptions,
                values: ['Start', 'Click', 'Click By Coordinates', 'Double Click', 'Double Click By Coordinates', 'Set', 'Set By Coordinates', 'Right Click', 'Right Click By Coordinates', 'Click And Hold', 'Hover', 'Verify Text', 'Verify Input Text By Coordinates', 'Is Blank', 'Contains', 'Verify Input Contains By Coordinates', 'Clear', 'Highlight', 'Create Variable', 'Dynamic Verify Text', 'Dynamic Contains', 'Dynamic Set', 'Wait For Element', 'Wait', 'Send Keys', 'Minimize', 'Maximize', 'Close'],
            }
        },
        {
            field: "App Path",
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Start') {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "App Title",
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Start') {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "Child Window Title",
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Click' || params.node.data['Action Types'] == 'Double Click' || params.node.data['Action Types'] == 'Set' || params.node.data['Action Types'] == 'Right Click' || params.node.data['Action Types'] == 'Click And Hold' || params.node.data['Action Types'] == 'Hover' || params.node.data['Action Types'] == 'Verify Text' || params.node.data['Action Types'] == 'Is Blank' || params.node.data['Action Types'] == 'Contains' || params.node.data['Action Types'] == 'Clear' || params.node.data['Action Types'] == 'Highlight' || params.node.data['Action Types'] == 'Create Variable' || params.node.data['Action Types'] == 'Dynamic Verify Text' || params.node.data['Action Types'] == 'Dynamic Contains' || params.node.data['Action Types'] == 'Dynamic Set' || params.node.data['Action Types'] == 'Wait For Element') {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "Locator Type",
            editable: true,
            cellRenderer: ShowOptions,
            cellEditor: 'agRichSelectCellEditor',
            //cellEditor:'agSelectCellEditor',
            // cellEditorPopup: true,
            // cellEditorPopupPosition: 'under',
            cellEditorParams: {
                cellRenderer: ShowOptions,
                values: ['Id', 'Name'],
                
            },
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Click' || params.node.data['Action Types'] == 'Double Click' || params.node.data['Action Types'] == 'Set' || params.node.data['Action Types'] == 'Right Click' || params.node.data['Action Types'] == 'Click And Hold' || params.node.data['Action Types'] == 'Hover' || params.node.data['Action Types'] == 'Verify Text' || params.node.data['Action Types'] == 'Is Blank' || params.node.data['Action Types'] == 'Contains' || params.node.data['Action Types'] == 'Clear' || params.node.data['Action Types'] == 'Highlight' || params.node.data['Action Types'] == 'Create Variable' || params.node.data['Action Types'] == 'Dynamic Verify Text' || params.node.data['Action Types'] == 'Dynamic Contains' || params.node.data['Action Types'] == 'Dynamic Set' || params.node.data['Action Types'] == 'Wait For Element') {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "Locator Value",
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Click' || params.node.data['Action Types'] == 'Double Click' || params.node.data['Action Types'] == 'Set' || params.node.data['Action Types'] == 'Right Click' || params.node.data['Action Types'] == 'Click And Hold' || params.node.data['Action Types'] == 'Hover' || params.node.data['Action Types'] == 'Verify Text' || params.node.data['Action Types'] == 'Is Blank' || params.node.data['Action Types'] == 'Contains' || params.node.data['Action Types'] == 'Clear' || params.node.data['Action Types'] == 'Highlight' || params.node.data['Action Types'] == 'Create Variable' || params.node.data['Action Types'] == 'Dynamic Verify Text' || params.node.data['Action Types'] == 'Dynamic Contains' || params.node.data['Action Types'] == 'Dynamic Set' || params.node.data['Action Types'] == 'Wait For Element') {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "Control Type",
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Click' || params.node.data['Action Types'] == 'Double Click' || params.node.data['Action Types'] == 'Set' || params.node.data['Action Types'] == 'Right Click' || params.node.data['Action Types'] == 'Click And Hold' || params.node.data['Action Types'] == 'Hover' || params.node.data['Action Types'] == 'Verify Text' || params.node.data['Action Types'] == 'Is Blank' || params.node.data['Action Types'] == 'Contains' || params.node.data['Action Types'] == 'Clear' || params.node.data['Action Types'] == 'Highlight' || params.node.data['Action Types'] == 'Create Variable' || params.node.data['Action Types'] == 'Dynamic Verify Text' || params.node.data['Action Types'] == 'Dynamic Contains' || params.node.data['Action Types'] == 'Dynamic Set' || params.node.data['Action Types'] == 'Wait For Element') {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "Window Index",
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Click' || params.node.data['Action Types'] == 'Double Click' || params.node.data['Action Types'] == 'Set' || params.node.data['Action Types'] == 'Right Click' || params.node.data['Action Types'] == 'Click And Hold' || params.node.data['Action Types'] == 'Hover' || params.node.data['Action Types'] == 'Verify Text' || params.node.data['Action Types'] == 'Is Blank' || params.node.data['Action Types'] == 'Contains' || params.node.data['Action Types'] == 'Clear' || params.node.data['Action Types'] == 'Highlight' || params.node.data['Action Types'] == 'Create Variable' || params.node.data['Action Types'] == 'Dynamic Verify Text' || params.node.data['Action Types'] == 'Dynamic Contains' || params.node.data['Action Types'] == 'Dynamic Set' || params.node.data['Action Types'] == 'Wait For Element') {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "Data",
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Set' || params.node.data['Action Types'] == 'Set By Coordinates' || params.node.data['Action Types'] == 'Verify Input Text By Coordinates' || params.node.data['Action Types'] == 'Verify Input Contains By Coordinates' || params.node.data['Action Types'] == 'Verify Text' || params.node.data['Action Types'] == 'Contains' || params.node.data['Action Types'] == 'Create Variable' || params.node.data['Action Types'] == 'Wait For Element' || params.node.data['Action Types'] == 'Wait' || params.node.data['Action Types'] == 'Send Keys') {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "Variable Value (If Create Variable is used)",
            editable: (params) => {
                if ((params.node.data['Action Types'] == 'Dynamic Set' || params.node.data['Action Types'] == 'Dynamic Contains' || params.node.data['Action Types'] == 'Dynamic Verify Text') && (variables.length != 0)) {
                    return true
                } else {
                    return false
                }
            },
            cellRenderer: ShowOptions,
            cellEditor: 'agRichSelectCellEditor',
            cellEditorParams: {
                cellRenderer: ShowOptions,
                values: variables,
            }
        },
        {
            field: "Coords Value (x,y)",
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Right Click By Coordinates' || params.node.data['Action Types'] == 'Double Click By Coordinates' || params.node.data['Action Types'] == 'Verify Input Text By Coordinates' || params.node.data['Action Types'] == 'Verify Input Contains By Coordinates' ||params.node.data['Action Types'] == 'Click By Coordinates' || params.node.data['Action Types'] == 'Set By Coordinates') {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "Screenshot",
            cellRenderer: EnableSwitch,
            editable: false
        },
        {
            field: "Enable Parameterized",
            cellRenderer: EnableSwitch,
            editable: false
        },
        {
            field: "Step Optional",
            cellRenderer: EnableSwitch,
            editable: false
        }
    ];

    const columnDefsSap = [
        {
            field: "Step Number",
            valueGetter: (params) => {
                return params.node.rowIndex + 1
            },
            editable: false,
            checkboxSelection: true,
            headerCheckboxSelection: true
        },
        {
            field: "Step Description",
        },
        {
            field: "Action Types",
            editable: true,
            cellRenderer: ShowOptions,
            cellEditor: 'agRichSelectCellEditor',
            //cellEditor:'agSelectCellEditor',
            // cellEditorPopup: true,
            // cellEditorPopupPosition: 'under',
            cellEditorParams: {
                cellRenderer: ShowOptions,
                values: ['Start', 'Click', 'Click By Coordinates', 'Double Click', 'Double Click By Coordinates', 'Set', 'Right Click By Coordinates', 'Verify Text', 'Is Blank', 'Contains', 'Create Variable', 'Dynamic Verify Text', 'Dynamic Contains', 'Dynamic Set', 'Send Virtual Keys', 'Select Combobox Item', 'Verify Combobox Item', 'Connect SAP System', 'Wait For Element', 'Clear', 'Wait', 'Send Keys', 'Minimize', 'Maximize', 'Close'],
            },
        },
        {
            field: "App Path",
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Start') {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "App Title",
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Connect SAP System') {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "Locator Type",
            editable: true,
            cellRenderer: ShowOptions,
            cellEditor: 'agRichSelectCellEditor',
            //cellEditor:'agSelectCellEditor',
            // cellEditorPopup: true,
            // cellEditorPopupPosition: 'under',
            cellEditorParams: {
                cellRenderer: ShowOptions,
                values: ['Id', 'Name'],
            },
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Click' || params.node.data['Action Types'] == 'Double Click' || params.node.data['Action Types'] == 'Set' || params.node.data['Action Types'] == 'Right Click' || params.node.data['Action Types'] == 'Verify Text' || params.node.data['Action Types'] == 'Is Blank' || params.node.data['Action Types'] == 'Contains' || params.node.data['Action Types'] == 'Clear' || params.node.data['Action Types'] == 'Create Variable' || params.node.data['Action Types'] == 'Dynamic Verify Text' || params.node.data['Action Types'] == 'Dynamic Contains' || params.node.data['Action Types'] == 'Dynamic Set' || params.node.data['Action Types'] == 'Wait For Element' || params.node.data['Action Types'] == 'Select Combobox Item' || params.node.data['Action Types'] == 'Verify Combobox Item' || params.node.data['Action Types'] == 'Send Virtual Keys') {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "Locator Value",
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Click' || params.node.data['Action Types'] == 'Double Click' || params.node.data['Action Types'] == 'Set' || params.node.data['Action Types'] == 'Right Click' || params.node.data['Action Types'] == 'Verify Text' || params.node.data['Action Types'] == 'Is Blank' || params.node.data['Action Types'] == 'Contains' || params.node.data['Action Types'] == 'Clear' || params.node.data['Action Types'] == 'Create Variable' || params.node.data['Action Types'] == 'Dynamic Verify Text' || params.node.data['Action Types'] == 'Dynamic Contains' || params.node.data['Action Types'] == 'Dynamic Set' || params.node.data['Action Types'] == 'Wait For Element' || params.node.data['Action Types'] == 'Select Combobox Item' || params.node.data['Action Types'] == 'Verify Combobox Item' || params.node.data['Action Types'] == 'Send Virtual Keys') {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "Property",
            cellRenderer: ShowOptions,
            cellEditor: 'agRichSelectCellEditor',
            cellEditorParams: {
                cellRenderer: ShowOptions,
                values: ['Index', 'Value', 'Key'],
            },
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Select Combobox Item' || params.node.data['Action Types'] == 'Verify Combobox Item') {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "Property Value",
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Select Combobox Item' || params.node.data['Action Types'] == 'Verify Combobox Item') {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "Data",
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Set' || params.node.data['Action Types'] == 'Set By Coordinates' || params.node.data['Action Types'] == 'Verify Text' || params.node.data['Action Types'] == 'Contains' ||  params.node.data['Action Types'] == 'Verify Combobox Item' || params.node.data['Action Types'] == 'Create Variable' || params.node.data['Action Types'] == 'Wait For Element' || params.node.data['Action Types'] == 'Wait' || params.node.data['Action Types'] == 'Send Keys' || params.node.data['Action Types'] == 'Send Virtual Keys' || params.node.data['Action Types'] == 'Connect SAP System') {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "Variable Value (If Create Variable is used)",
            editable: (params) => {
                if ((params.node.data['Action Types'] == 'Dynamic Set' || params.node.data['Action Types'] == 'Dynamic Contains' || params.node.data['Action Types'] == 'Dynamic Verify Text') && (variables.length != 0)) {
                    return true
                } else {
                    return false
                }
            },
            cellRenderer: ShowOptions,
            cellEditor: 'agRichSelectCellEditor',
            cellEditorParams: {
                cellRenderer: ShowOptions,
                values: variables,
            }
        },
        {
            field: "Coords Value (x,y)",
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Right Click By Coordinates' || params.node.data['Action Types'] == 'Double Click By Coordinates' || params.node.data['Action Types'] == 'Click By Coordinates' || params.node.data['Action Types'] == 'Set By Coordinates') {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "Screenshot",
            cellRenderer: EnableSwitch,
            editable: false
        },
        {
            field: "Enable Parameterized",
            cellRenderer: EnableSwitch,
            editable: false
        },
        {
            field: "Step Optional",
            cellRenderer: EnableSwitch,
            editable: false
        }
    ];

    const columnDefsWinSap = [
        {
            field: "Step Number",
            valueGetter: (params) => {
                return params.node.rowIndex + 1
            },
            editable: false,
            checkboxSelection: true,
            headerCheckboxSelection: true
        },
        {
            field: "Win32 / SAP",
            editable: true,
            cellRenderer: ShowOptions,
            cellEditor: 'agRichSelectCellEditor',
            cellEditorParams: {
                cellRenderer: ShowOptions,
                values: ['Win32', 'SAP'],
            }
        },
        {
            field: "Step Description",
        },
        {
            field: "Action Types",
            editable: true,
            cellRenderer: ShowOptions,
            cellEditor: 'agRichSelectCellEditor',
            //cellEditor:'agSelectCellEditor',
            // cellEditorPopup: true,
            // cellEditorPopupPosition: 'under',
            cellEditorParams: {
                cellRenderer: ShowOptions,
                values: ['Start', 'Click', 'Click By Coordinates', 'Double Click', 'Double Click By Coordinates', 'Set', 'Right Click', 'Right Click By Coordinates', 'Verify Text','Verify Input Text By Coordinates', 'Is Blank', 'Contains', 'Verify Input Contains By Coordinates','Create Variable', 'Dynamic Verify Text', 'Dynamic Contains', 'Dynamic Set', 'Send Virtual Keys', 'Select Combobox Item', 'Verify Combobox Item', 'Connect SAP System', 'Wait For Element', 'Clear', 'Wait', 'Send Keys', 'Minimize', 'Maximize', 'Close'],
            },
        },
        {
            field: "App Path",
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Start') {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "App Title",
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Start' || params.node.data['Action Types'] == 'Connect SAP System') {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "Child Window Title",
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Click' || params.node.data['Action Types'] == 'Double Click' || params.node.data['Action Types'] == 'Set' || params.node.data['Action Types'] == 'Right Click' || params.node.data['Action Types'] == 'Click And Hold' || params.node.data['Action Types'] == 'Hover' || params.node.data['Action Types'] == 'Verify Text' || params.node.data['Action Types'] == 'Is Blank' || params.node.data['Action Types'] == 'Contains' || params.node.data['Action Types'] == 'Clear' || params.node.data['Action Types'] == 'Highlight' || params.node.data['Action Types'] == 'Create Variable' || params.node.data['Action Types'] == 'Dynamic Verify Text' || params.node.data['Action Types'] == 'Dynamic Contains' || params.node.data['Action Types'] == 'Dynamic Set' || params.node.data['Action Types'] == 'Wait For Element') {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "Locator Type",
            editable: true,
            cellRenderer: ShowOptions,
            cellEditor: 'agRichSelectCellEditor',
            //cellEditor:'agSelectCellEditor',
            // cellEditorPopup: true,
            // cellEditorPopupPosition: 'under',
            cellEditorParams: {
                cellRenderer: ShowOptions,
                values: ['Id', 'Name'],
            },
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Click' || params.node.data['Action Types'] == 'Double Click' || params.node.data['Action Types'] == 'Set' || params.node.data['Action Types'] == 'Right Click' || params.node.data['Action Types'] == 'Verify Text' || params.node.data['Action Types'] == 'Is Blank' || params.node.data['Action Types'] == 'Contains' || params.node.data['Action Types'] == 'Clear' || params.node.data['Action Types'] == 'Create Variable' || params.node.data['Action Types'] == 'Dynamic Verify Text' || params.node.data['Action Types'] == 'Dynamic Contains' || params.node.data['Action Types'] == 'Dynamic Set' || params.node.data['Action Types'] == 'Wait For Element' || params.node.data['Action Types'] == 'Select Combobox Item' || params.node.data['Action Types'] == 'Verify Combobox Item' ||  params.node.data['Action Types'] == 'Send Virtual Keys') {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "Locator Value",
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Click' || params.node.data['Action Types'] == 'Double Click' || params.node.data['Action Types'] == 'Set' || params.node.data['Action Types'] == 'Right Click' || params.node.data['Action Types'] == 'Verify Text' || params.node.data['Action Types'] == 'Is Blank' || params.node.data['Action Types'] == 'Contains' || params.node.data['Action Types'] == 'Clear' || params.node.data['Action Types'] == 'Create Variable' || params.node.data['Action Types'] == 'Dynamic Verify Text' || params.node.data['Action Types'] == 'Dynamic Contains' || params.node.data['Action Types'] == 'Dynamic Set' || params.node.data['Action Types'] == 'Wait For Element' || params.node.data['Action Types'] == 'Select Combobox Item' || params.node.data['Action Types'] == 'Verify Combobox Item' || params.node.data['Action Types'] == 'Send Virtual Keys' ) {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "Control Type",
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Click' || params.node.data['Action Types'] == 'Double Click' || params.node.data['Action Types'] == 'Set' || params.node.data['Action Types'] == 'Right Click' || params.node.data['Action Types'] == 'Verify Text' || params.node.data['Action Types'] == 'Is Blank' || params.node.data['Action Types'] == 'Contains' || params.node.data['Action Types'] == 'Clear' || params.node.data['Action Types'] == 'Create Variable' || params.node.data['Action Types'] == 'Dynamic Verify Text' || params.node.data['Action Types'] == 'Dynamic Contains' || params.node.data['Action Types'] == 'Dynamic Set' || params.node.data['Action Types'] == 'Wait For Element' || params.node.data['Action Types'] == 'Select Combobox Item' || params.node.data['Action Types'] == 'Verify Combobox Item' ) {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "Window Index",
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Click' || params.node.data['Action Types'] == 'Double Click' || params.node.data['Action Types'] == 'Set' || params.node.data['Action Types'] == 'Right Click' || params.node.data['Action Types'] == 'Verify Text' || params.node.data['Action Types'] == 'Is Blank' || params.node.data['Action Types'] == 'Contains' || params.node.data['Action Types'] == 'Clear' || params.node.data['Action Types'] == 'Create Variable' || params.node.data['Action Types'] == 'Dynamic Verify Text' || params.node.data['Action Types'] == 'Dynamic Contains' || params.node.data['Action Types'] == 'Dynamic Set' || params.node.data['Action Types'] == 'Wait For Element' || params.node.data['Action Types'] == 'Select Combobox Item' || params.node.data['Action Types'] == 'Verify Combobox Item' ) {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "Property",
            cellRenderer: ShowOptions,
            cellEditor: 'agRichSelectCellEditor',
            cellEditorParams: {
                cellRenderer: ShowOptions,
                values: ['Index', 'Value', 'Key'],
            },
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Select Combobox Item' || params.node.data['Action Types'] == 'Verify Combobox Item') {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "Property Value",
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Select Combobox Item' || params.node.data['Action Types'] == 'Verify Combobox Item') {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "Data",
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Set' || params.node.data['Action Types'] == 'Set By Coordinates' || params.node.data['Action Types'] == 'Verify Input Text By Coordinates' || params.node.data['Action Types'] == 'Verify Input Contains By Coordinates' || params.node.data['Action Types'] == 'Verify Text' || params.node.data['Action Types'] == 'Contains' || params.node.data['Action Types'] == 'Verify Combobox Item' || params.node.data['Action Types'] == 'Create Variable'  || params.node.data['Action Types'] == 'Wait For Element' || params.node.data['Action Types'] == 'Wait' || params.node.data['Action Types'] == 'Send Keys' || params.node.data['Action Types'] == 'Send Virtual Keys' || params.node.data['Action Types'] == 'Connect SAP System') {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "Variable Value (If Create Variable is used)",
            editable: (params) => {
                if ((params.node.data['Action Types'] == 'Dynamic Set' || params.node.data['Action Types'] == 'Dynamic Contains' || params.node.data['Action Types'] == 'Dynamic Verify Text') && (variables.length != 0)) {
                    return true
                } else {
                    return false
                }
            },
            cellRenderer: ShowOptions,
            cellEditor: 'agRichSelectCellEditor',
            cellEditorParams: {
                cellRenderer: ShowOptions,
                values: variables,
            }
        },
        {
            field: "Coords Value (x,y)",
            editable: (params) => {
                if (params.node.data['Action Types'] == 'Right Click By Coordinates' || params.node.data['Action Types'] == 'Double Click By Coordinates' || params.node.data['Action Types'] == 'Verify Input Text By Coordinates' || params.node.data['Action Types'] == 'Verify Input Contains By Coordinates' || params.node.data['Action Types'] == 'Click By Coordinates' || params.node.data['Action Types'] == 'Set By Coordinates') {
                    console.log(`params.node.data['Action Types'] ` + params.node.data['Action Types'])
                    return true
                } else {
                    return false
                }
            }
        },
        {
            field: "Screenshot",
            cellRenderer: EnableSwitch,
            editable: false
        },
        {
            field: "Enable Parameterized",
            cellRenderer: EnableSwitch,
            editable: false
        },
        {
            field: "Step Optional",
            cellRenderer: EnableSwitch,
            editable: false
        }
    ];

    document.getElementById('clear-button').addEventListener('click', () => {
        // gridOptions.api.setRowData([])
        document.getElementById("desk-test-message").innerHTML = ``;
        let selectedRows = gridOptions.api.getSelectedRows()
        gridOptions.api.applyTransaction({ remove: selectedRows })
    })

    document.getElementById('add-button').addEventListener('click', () => {
        if(document.getElementById('filename').value == ''){
            document.getElementById("desk-test-message").style.color = '#E4463C';
            document.getElementById("desk-test-message").innerHTML = "Invalid Operation: Please Provide Test Name";
            return '';
        } 
        document.getElementById("desk-test-message").innerHTML = "";
        addNewRow();  
    })

    function addNewRow() {
        gridOptions.api.applyTransaction(
            { add: [{ "Action Types": "", "Locator Type": "", "Win32 / SAP": "", "Property":"", "Variable Value (If Create Variable is used)": "" }] })
    }

    function onFirstDataRendered() {
        // gridOptions.columnApi.sizeColumnsToFit();
        const allColumnIds = [];
        gridOptions.columnApi.getColumns().forEach((column) => {
            allColumnIds.push(column.getId());
        });
        console.log("All columnIds " + allColumnIds)
        gridOptions.columnApi.autoSizeColumns(allColumnIds, false);
    }

    let isWin = document.getElementById('win32').checked;
    let isSap = document.getElementById('sap').checked;
    let isWinSap = document.getElementById('win-sap').checked;
    let columnDefs, csvData = null;
    if (isWin) {
        columnDefs = columnDefsWin;
    } else if (isSap) {
        columnDefs = columnDefsSap;
    } else {
        console.log("WIN SAP CONNECTOR")
        columnDefs = columnDefsWinSap;
    }

    document.getElementById('delete-button').addEventListener('click', () => {
        document.getElementById("desk-test-message").innerHTML = ""
        document.getElementById('clear-button').style.display = 'none';
        document.getElementById('add-button').style.display = 'none';
        document.getElementById('btnAttachment').style.display = 'none';
        document.getElementById('btn-para').style.display = 'none';
        document.getElementById('upload-button').style.display = 'none';
        document.getElementById('sap').disabled = false;
        document.getElementById('win32').disabled = false;
        document.getElementById('win-sap').disabled = false;
        document.getElementById('sap').checked = false;
        document.getElementById('win32').checked = false;
        document.getElementById('win-sap').checked = false;
        gridOptions.api.destroy();
        document.getElementById('btnAttachment').value = 'Import';
        document.getElementById('btn-para').disabled = true;
        document.getElementById('para-detail').style.display = 'none';
    })

    document.getElementById('attachment').addEventListener('change',()=>{
        if(document.getElementById('btnAttachment').value != 'Import'){
            document.getElementById("desk-test-message").innerHTML = "";
            console.log('inside')
            console.log(document.getElementById('btnAttachment').value, isWin)
            let fileSubmitted = document.getElementById('btnAttachment').value;
            console.log('isWin, isSap, isWinSap')
            console.log(isWin, isSap, isWinSap)
            if((isWin == true) && (isSap == false) && (isWinSap == false)){
                console.log("inside isWin")
                let hasWin = fileSubmitted.includes('_win32')
                console.log("Match correct!")
                if(hasWin) displayRowsInGrid();
                else{
                    document.getElementById("desk-test-message").style.color = '#E4463C';
                    document.getElementById("desk-test-message").innerHTML = "Invalid Operation: The File Selected for Import Doesn't match the Selected Option for Building Test Scripts ie. WIN32, Kindly Delete the Grid, Select the Valid Option and Retry Importing.";
                }  
            } else if((isWinSap == true) && (isWin == false) && (isSap == false)){
                console.log("inside isWinSap")
                let hasWinSap = fileSubmitted.includes('_WINSAP')
                console.log("Match correct!")
                if(hasWinSap) displayRowsInGrid();
                else{
                    document.getElementById("desk-test-message").style.color = '#E4463C';
                    document.getElementById("desk-test-message").innerHTML = "Invalid Operation: The File Selected for Import Doesn't match the Selected Option for Building Test Scripts ie. WIN/SAP Connector, Kindly Delete the Grid, Select the Valid Option and Retry Importing.";
                }  
            } else if((isSap == true) && (isWin == false) && (isWinSap == false)){
                console.log("inside isSap")
                let hasSap = fileSubmitted.includes('_sap')
                console.log("Match correct!")
                if(hasSap) displayRowsInGrid();
                else{
                    document.getElementById("desk-test-message").style.color = '#E4463C';
                    document.getElementById("desk-test-message").innerHTML = "Invalid Operation: The File Selected for Import Doesn't match the Selected Option for Building Test Scripts ie. SAP, Kindly Delete the Grid, Select the Valid Option and Retry Importing.";
                }  
            }
        }
    })

    function displayRowsInGrid(){
        let totalRow = gridOptions.api.getDisplayedRowCount();
        console.log(totalRow);
        if(document.getElementById('btnAttachment').value != 'Import'){
            let FILENAME = document.getElementById('btnAttachment').value;
            console.log("FILENAME IMPORT "+FILENAME)
            if(!fs.existsSync(`${process.env.HOMEDRIVE + process.env.HOMEPATH +'\\Downloads' +'\\'+ FILENAME}`)){
                document.getElementById("desk-test-message").style.color = '#E4463C';
                document.getElementById("desk-test-message").innerHTML = "Invalid Operation: File Doesn't Exist!";
                return;
            }
            let content = fs.readFileSync(`${process.env.HOMEDRIVE + process.env.HOMEPATH +'\\Downloads' +'\\'+ FILENAME}`,'utf8');
            content = JSON.parse(content)
            console.log('content '+content)
            console.log(content.parameterization['status'])
            for(let iterate=0; iterate<content.steps_input['length'];iterate++){
                console.log("IS SENSITIVE "+content.steps_input[iterate]['is_sensitive'])
                console.log('COORDS '+content.steps_input[iterate]['coords_value'] )
                if(content.steps_input[iterate]['step_no'] == iterate+1){
                    gridOptions.api.applyTransaction(
                        { add: [{ 
                           "Step Number":  content.steps_input[iterate]['step_no'],
                           "Step Description": content.steps_input[iterate]['action'],
                           "Win32 / SAP": content.steps_input[iterate]['is_sap_logon'] == true ? 'Win32' : 'SAP',
                           "Action Types": content.steps_input[iterate]['action'],
                           "App Path": content.steps_input[iterate]['app_path'] ? content.steps_input[iterate]['app_path'] : "",
                           "App Title": content.steps_input[iterate]['app_title'] ? content.steps_input[iterate]['app_title'] : "",
                           "Child Window Title": content.steps_input[iterate]['child_window_title'] ? content.steps_input[iterate]['child_window_title'] : "",
                           "Locator Type": content.steps_input[iterate]['element_type'] ? content.steps_input[iterate]['element_type'] : "",
                           "Locator Value": content.steps_input[iterate]['element_value'] ? content.steps_input[iterate]['element_value'] : "",
                           "Property": content.steps_input[iterate]['property'] ? content.steps_input[iterate]['property'] : "",
                           "Property Value": content.steps_input[iterate]['property_value'] ? content.steps_input[iterate]['property_value'] : "",
                           "Control Type": content.steps_input[iterate]['control_type'] ? content.steps_input[iterate]['control_type'] : "",
                           "Window Index": content.steps_input[iterate]['found_index'] ? content.steps_input[iterate]['found_index'] : content.steps_input[iterate]['index'] ? content.steps_input[iterate]['index'] : "",
                           "Data": content.steps_input[iterate]['data_value'] ? content.steps_input[iterate]['data_value'] : "",
                           "Variable Value (If Create Variable is used)": content.steps_input[iterate]['var_val'] ? content.steps_input[iterate]['var_val'] : "",
                           "Coords Value (x,y)": content.steps_input[iterate]['coords_value'] ? content.steps_input[iterate]['coords_value'] : "",
                           "Screenshot": content.steps_input[iterate]['is_sensitive'] == true ? false :true,
                           "Enable Parameterized" : content.steps_input[iterate]['is_parameterized'] == true ? true :false,
                           "Step Optional": content.steps_input[iterate]['optional'] == true ? true :false,
                        }],
                        addIndex: totalRow ? totalRow+1 : content.steps_input[iterate]['step_no'] })
                }
                if(content.parameterization['file_path'] != ""){
                    document.getElementById('csv-link').value = content.parameterization['file_path']
                }
            }
        } else {
            // console.log(document.getElementById('btnAttachment').value)
            document.getElementById("desk-test-message").style.color = '#E4463C';
            document.getElementById("desk-test-message").innerHTML = "Invalid Operation: File Name Not Provided.";
            return;
        }
    }
    
    document.getElementById('upload-button').addEventListener('click', () => {
            document.getElementById("desk-test-message").style.color = '#007ED9';
            document.getElementById("desk-test-message").innerHTML = "Execution In-Progress.."
            let headerWin = ['step_no', 'step_desc', 'action', 'app_path', 'app_title', 'child_window_title', 'element_type', 'element_value', 'control_type', 'found_index', 'data_value', 'var_val', 'coords_value', 'is_sensitive', 'parameterized', 'optional'];
            let headersSap = ['step_no', 'step_desc', 'action', 'app_path', 'app_title', 'element_type', 'element_value', 'property', 'property_value', 'data_value', 'var_val', 'coords_value', 'is_sensitive', 'parameterized', 'optional'];
            let headersSapWin = ['step_no', 'is_sap_logon', 'step_desc', 'action', 'app_path', 'app_title', 'child_window_title', 'element_type', 'element_value', 'control_type', 'index', 'property', 'property_value', 'data_value', 'var_val', 'coords_value', 'is_sensitive', 'parameterized', 'optional'];
            let headerForJson;
            console.log('Clicked Export, converting to csv')
            csvData = gridOptions.api.getDataAsCsv();
            console.log(csvData)
            if (isWin) {
                headerForJson = headerWin
            } else if (isSap) {
                headerForJson = headersSap
            } else {
                headerForJson = headersSapWin
            }
            console.log('what header? ' + headerForJson)
            csv({
                noheader: false,
                headers: headerForJson,
                output: "json"
            }).fromString(csvData).then((jsonObj) => {
                console.log("JSON O/P " + JSON.stringify(jsonObj));
                if(jsonObj['length'] == 0){
                    document.getElementById("desk-test-message").style.color = '#E4463C';
                    document.getElementById("desk-test-message").innerHTML = "Invalid Operation: No Rows";
                    return ''
                }
                for(let iter=0; iter<jsonObj['length'];iter++){
                    if(jsonObj[iter]['action'] == ''){
                        document.getElementById("desk-test-message").style.color = '#E4463C';
                        document.getElementById("desk-test-message").innerHTML = "Invalid Operation: Missing Action Type/Missing Values"
                        return ''
                    }
                }
    
                if (isWin) modifyJson(jsonObj);
                else if (isWinSap) modifyJsonWinSap(jsonObj);
                else if (isSap) modifyJsonSap(jsonObj);
                else {
                    console.log('invalid')
                    // document.getElementById("desk-test-message").innerHTML = "Invalid Operation";
                }
            })
    })
    

    // if (isWin) modifyJson(jsonObj);
    // else if (isWinSap) modifyJsonWinSap(jsonObj);
    // else if (isSap) modifyJsonSap(jsonObj);
    // else {
    //     console.log('invalid')
    //     document.getElementById("desk-test-message").innerHTML = "Invalid Operation";
    // }

    function modifyJson(jsonObj) {
        let fillJson = {
            "steps_input": [], "parameterization": {
                "status": false,
                "file_path": ""
            }
        };
        let filepath = document.getElementById('csv-link').value != '' ? document.getElementById('csv-link').value : document.getElementById('btnAttachment-para').value != 'Upload' ? `${process.env.HOMEDRIVE + process.env.HOMEPATH +'\\Downloads' +'\\'+ document.getElementById('btnAttachment-para').value}` : console.log('Invalid name');
        console.log('filepath ' + filepath)
        for (let iterate = 0; iterate < jsonObj['length']; iterate++) {
            if (jsonObj[iterate]['parameterized'] == 'true') {
                fillJson['parameterization']['status'] = true;
                fillJson['parameterization']['file_path'] = filepath;
            }
            if (jsonObj[iterate]['action'] == "Start") {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "action": jsonObj[iterate]['action'],
                    "app_path": jsonObj[iterate]['app_path'],
                    "app_title": jsonObj[iterate]['app_title'],
                    "start_delay": 5,
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false
                })
            } else if (jsonObj[iterate]['action'] == "Set") {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "action": jsonObj[iterate]['action'],
                    "control_type": jsonObj[iterate]['control_type'],
                    "data_value": jsonObj[iterate]['data_value'],
                    "element_type": jsonObj[iterate]['element_type'],
                    "element_value": jsonObj[iterate]['element_value'],
                    "child_window_title": jsonObj[iterate]['child_window_title'],
                    "found_index": jsonObj[iterate]['found_index'] != '' ?  jsonObj[iterate]['found_index'] : 0,
                    "access_control_type": null,
                    "property": null,
                    "is_sensitive": jsonObj[iterate]['is_sensitive'] == 'true' ? false : true,
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false,
                    "delay_after": 0.5
                })
            } else if (jsonObj[iterate]['action'] == "Send Keys" || jsonObj[iterate]['action'] == "Wait") {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "action": jsonObj[iterate]['action'],
                    "data_value": jsonObj[iterate]['data_value'],
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_sensitive": jsonObj[iterate]['is_sensitive'] == 'true' ? false : true,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false
                })
            } else if (jsonObj[iterate]['action'] == "Minimize" || jsonObj[iterate]['action'] == "Maximize" || jsonObj[iterate]['action'] == "Close") {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "action": jsonObj[iterate]['action'],
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_sensitive": jsonObj[iterate]['is_sensitive'] == 'true' ? false : true,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false
                })
            } else if (jsonObj[iterate]['action'].includes('By Coordinates')) {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "action": jsonObj[iterate]['action'],
                    "coords_value": jsonObj[iterate]['coords_value'],
                    "data_value": jsonObj[iterate]['data_value'],
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_sensitive": jsonObj[iterate]['is_sensitive'] == 'true' ? false : true,
                    "delay_after": 0.5,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false
                })
            }else if (jsonObj[iterate]['action'] == "Wait For Element" || jsonObj[iterate]['action'] == "Create Variable" || jsonObj[iterate]['action'] == "Clear" || jsonObj[iterate]['action'] == "Contains" || jsonObj[iterate]['action'] == "Is Blank" || jsonObj[iterate]['action'] == "Verify Text") {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "child_window_title": jsonObj[iterate]['child_window_title'],
                    "data_value": jsonObj[iterate]['data_value'],
                    "action": jsonObj[iterate]['action'],
                    "control_type": jsonObj[iterate]['control_type'],
                    "element_type": jsonObj[iterate]['element_type'],
                    "element_value": jsonObj[iterate]['element_value'],
                    "found_index": jsonObj[iterate]['found_index'] != '' ?  jsonObj[iterate]['found_index'] : 0,
                    "access_control_type": null,
                    "property": null,
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_sensitive": jsonObj[iterate]['is_sensitive'] == 'true' ? false : true,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false
                })
            }else if (jsonObj[iterate]['action'] == "Dynamic Set" || jsonObj[iterate]['action'] == "Dynamic Contains" || jsonObj[iterate]['action'] == "Dynamic Verify Text") {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "child_window_title": jsonObj[iterate]['child_window_title'],
                    "data_value": jsonObj[iterate]['var_val'],
                    "action": jsonObj[iterate]['action'],
                    "control_type": jsonObj[iterate]['control_type'],
                    "element_type": jsonObj[iterate]['element_type'],
                    "element_value": jsonObj[iterate]['element_value'],
                    "found_index": jsonObj[iterate]['found_index'] != '' ?  jsonObj[iterate]['found_index'] : 0,
                    "access_control_type": null,
                    "property": null,
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_sensitive": jsonObj[iterate]['is_sensitive'] == 'true' ? false : true,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false
                })
            } else {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "action": jsonObj[iterate]['action'],
                    "control_type": jsonObj[iterate]['control_type'],
                    "element_type": jsonObj[iterate]['element_type'],
                    "element_value": jsonObj[iterate]['element_value'],
                    "child_window_title": jsonObj[iterate]['child_window_title'],
                    "found_index": jsonObj[iterate]['found_index'] != '' ?  jsonObj[iterate]['found_index'] : 0,
                    "access_control_type": null,
                    "property": null,
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_sensitive": jsonObj[iterate]['is_sensitive'] == 'true' ? false : true,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false,
                    "delay_after": 0.5
                })
            }
        }
        console.log("FILLJSON " + JSON.stringify(fillJson))
        let jsonContent = JSON.stringify(fillJson);
        let PATH;
        let FILENAME = document.getElementById('filename').value ? `${document.getElementById('filename').value}_win32.json` : document.getElementById('btnAttachment').value != 'Import' ? document.getElementById('btnAttachment').value : null;
        if(FILENAME != null){
            PATH = `${process.env.HOMEDRIVE + process.env.HOMEPATH + '\\Downloads' + '\\' + FILENAME}`
        } else {
           PATH = ''
        }
        console.log(`${process.env.HOMEDRIVE + process.env.HOMEPATH + '\\Downloads' + '\\' + FILENAME}`);
        if (FILENAME == null) {
            document.getElementById("desk-test-message").style.color = '#E4463C';
            document.getElementById("desk-test-message").innerHTML = "Invalid Operation: File Name Not Provided.";
            return;
        }
        fs.writeFile(PATH, jsonContent, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
        });
        document.getElementById('filename').value = ''
        document.getElementById('btnAttachment').value = 'Import'
        performDeskTest(fillJson, "win32")
    }

    function modifyJsonWinSap(jsonObj) {
        console.log("Win SAP")
        let fillJson = {
            "steps_input": [], "parameterization": {
                "status": false,
                "file_path": ""
            }
        };
        let filepath = document.getElementById('csv-link').value ? document.getElementById('csv-link').value : `${process.env.HOMEDRIVE + process.env.HOMEPATH +'\\Downloads' +'\\'+ document.getElementById('btnAttachment-para').value}`;
        console.log('filepath ' + filepath)
        for (let iterate = 0; iterate < jsonObj['length']; iterate++) {
            if (jsonObj[iterate]['parameterized'] == 'true') {
                console.log("INSIDE PARAMETER")
                fillJson['parameterization']['status'] = true;
                fillJson['parameterization']['file_path'] = filepath;
            }
            if (jsonObj[iterate]['action'] == "Start") {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "action": jsonObj[iterate]['action'],
                    "app_path": jsonObj[iterate]['app_path'],
                    "app_title": jsonObj[iterate]['app_title'],
                    "start_delay": 5,
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_sap_logon": jsonObj[iterate]['is_sap_logon'] == 'SAP' ? false : true,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false
                })
            } else if (jsonObj[iterate]['action'] == "Set") {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "action": jsonObj[iterate]['action'],
                    "child_window_title": jsonObj[iterate]['child_window_title'],
                    "control_type": jsonObj[iterate]['control_type'],
                    "data_value": jsonObj[iterate]['data_value'],
                    "element_type": jsonObj[iterate]['element_type'],
                    "element_value": jsonObj[iterate]['element_value'],
                    "index": jsonObj[iterate]['index'] != '' ? jsonObj[iterate]['index'] : 0,
                    "access_control_type": null,
                    "property": null,
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_sensitive": jsonObj[iterate]['is_sensitive'] == 'true' ? false : true,
                    "is_sap_logon": jsonObj[iterate]['is_sap_logon'] == 'SAP' ? false : true,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false
                })
            } else if (jsonObj[iterate]['action'] == "Send Keys" || jsonObj[iterate]['action'] == "Wait" || jsonObj[iterate]['action'] == "Connect SAP System") {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "action": jsonObj[iterate]['action'],
                    "data_value": jsonObj[iterate]['data_value'],
                    "app_title": jsonObj[iterate]['app_title'],
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_sensitive": jsonObj[iterate]['is_sensitive'] == 'true' ? false : true,
                    "is_sap_logon": jsonObj[iterate]['is_sap_logon'] == 'SAP' ? false : true,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false
                })
            } else if (jsonObj[iterate]['action'] == "Send Virtual Keys") {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "action": jsonObj[iterate]['action'],
                    "data_value": jsonObj[iterate]['data_value'],
                    "element_type": jsonObj[iterate]['element_type'],
                    "element_value": jsonObj[iterate]['element_value'],
                    "access_control_type": null,
                    "property": null,
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_sensitive": jsonObj[iterate]['is_sensitive'] == 'true' ? false : true,
                    "is_sap_logon": jsonObj[iterate]['is_sap_logon'] == 'SAP' ? false : true,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false
                })
            } else if (jsonObj[iterate]['action'] == "Wait For Element" || jsonObj[iterate]['action'] == "Verify Combobox Item" || jsonObj[iterate]['action'] == "Select Combobox Item" || jsonObj[iterate]['action'] == "Create Variable" || jsonObj[iterate]['action'] == "Clear" || jsonObj[iterate]['action'] == "Contains" || jsonObj[iterate]['action'] == "Is Blank" || jsonObj[iterate]['action'] == "Verify Text") {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "child_window_title": jsonObj[iterate]['child_window_title'],
                    "data_value": jsonObj[iterate]['data_value'],
                    "action": jsonObj[iterate]['action'],
                    "control_type": jsonObj[iterate]['control_type'],
                    "element_type": jsonObj[iterate]['element_type'],
                    "element_value": jsonObj[iterate]['element_value'],
                    "index": jsonObj[iterate]['index'] != '' ? jsonObj[iterate]['index'] : 0,
                    "access_control_type": null,
                    "property": jsonObj[iterate]['property'],
                    "property_value": jsonObj[iterate]['property_value'],
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_sensitive": jsonObj[iterate]['is_sensitive'] == 'true' ? false : true,
                    "is_sap_logon": jsonObj[iterate]['is_sap_logon'] == 'SAP' ? false : true,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false
                })
            } else if (jsonObj[iterate]['action'] == "Dynamic Set" || jsonObj[iterate]['action'] == "Dynamic Contains" || jsonObj[iterate]['action'] == "Dynamic Verify Text") {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "child_window_title": jsonObj[iterate]['child_window_title'],
                    "data_value": jsonObj[iterate]['var_val'],
                    "action": jsonObj[iterate]['action'],
                    "control_type": jsonObj[iterate]['control_type'],
                    "element_type": jsonObj[iterate]['element_type'],
                    "element_value": jsonObj[iterate]['element_value'],
                    "index": jsonObj[iterate]['index'] != '' ? jsonObj[iterate]['index'] : 0,
                    "access_control_type": null,
                    "property": null,
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_sensitive": jsonObj[iterate]['is_sensitive'] == 'true' ? false : true,
                    "is_sap_logon": jsonObj[iterate]['is_sap_logon'] == 'SAP' ? false : true,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false
                })
            } else if (jsonObj[iterate]['action'] == "Minimize" || jsonObj[iterate]['action'] == "Maximize" || jsonObj[iterate]['action'] == "Close") {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "action": jsonObj[iterate]['action'],
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_sensitive": jsonObj[iterate]['is_sensitive'] == 'true' ? false : true,
                    "is_sap_logon": jsonObj[iterate]['is_sap_logon'] == 'SAP' ? false : true,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false
                })
            } else if (jsonObj[iterate]['action'].includes('By Coordinates')) {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "action": jsonObj[iterate]['action'],
                    "coords_value": jsonObj[iterate]['coords_value'],
                    "data_value": jsonObj[iterate]['data_value'],
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_sensitive": jsonObj[iterate]['is_sensitive'] == 'true' ? false : true,
                    "is_sap_logon": jsonObj[iterate]['is_sap_logon'] == 'SAP' ? false : true,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false
                })
            } else {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "action": jsonObj[iterate]['action'],
                    "child_window_title": jsonObj[iterate]['child_window_title'],
                    "control_type": jsonObj[iterate]['control_type'],
                    "element_type": jsonObj[iterate]['element_type'],
                    "element_value": jsonObj[iterate]['element_value'],
                    "index": jsonObj[iterate]['index'] != '' ? jsonObj[iterate]['index'] : 0,
                    "access_control_type": null,
                    "property": null,
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_sensitive": jsonObj[iterate]['is_sensitive'] == 'true' ? false : true,
                    "is_sap_logon": jsonObj[iterate]['is_sap_logon'] == 'SAP' ? false : true,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false
                })
            }
        }
        let jsonContent = JSON.stringify(fillJson);
        let PATH;
        let FILENAME = document.getElementById('filename').value ? `${document.getElementById('filename').value}_WINSAP.json` : document.getElementById('btnAttachment').value != 'Import' ? document.getElementById('btnAttachment').value : null;
        if(FILENAME != null){
            PATH = `${process.env.HOMEDRIVE + process.env.HOMEPATH + '\\Downloads' + '\\' + FILENAME}`
        } else {
           PATH = ''
        }
        console.log(`${process.env.HOMEDRIVE + process.env.HOMEPATH + '\\Downloads' + '\\' + FILENAME}.json`);
        if (FILENAME == null) {
            document.getElementById("desk-test-message").style.color = '#E4463C';
            document.getElementById("desk-test-message").innerHTML = "Invalid Operation: File Name Not Provided.";
            return;
        }
        fs.writeFile(PATH, jsonContent, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
        });
        document.getElementById('filename').value = ''
        document.getElementById('btnAttachment').value = 'Import'
        console.log("FILL JSON FOR Win SAP " + JSON.stringify(fillJson))
        //window.electron.desktopTest(fillJson, "sap")
        performDeskTest(fillJson, "win-sap")
    }

    function modifyJsonSap(jsonObj) {
        console.log("SAP")
        let fillJson = {
            "steps_input": [], "parameterization": {
                "status": false,
                "file_path": ''
            }
        };
        let filepath = document.getElementById('csv-link').value ? document.getElementById('csv-link').value : `${process.env.HOMEDRIVE + process.env.HOMEPATH +'\\Downloads' +'\\'+ document.getElementById('btnAttachment-para').value}`;
        console.log('filepath ' + filepath)
        for (let iterate = 0; iterate < jsonObj['length']; iterate++) {
            if (jsonObj[iterate]['parameterized'] == 'true') {
                fillJson['parameterization']['status'] = true;
                fillJson['parameterization']['file_path'] = filepath;
            }
            if (jsonObj[iterate]['action'] == "Start") {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "action": jsonObj[iterate]['action'],
                    "app_path": jsonObj[iterate]['app_path'],
                    "app_title": jsonObj[iterate]['app_title'],
                    "is_sensitive": jsonObj[iterate]['is_sensitive'] == 'true' ? false: true,
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false,
                    "start_delay": 5,
                })
            } else if (jsonObj[iterate]['action'] == "Set") {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "action": jsonObj[iterate]['action'],
                    "data_value": jsonObj[iterate]['data_value'],
                    "element_type": jsonObj[iterate]['element_type'],
                    "element_value": jsonObj[iterate]['element_value'],
                    "index": 0,
                    "access_control_type": null,
                    "property": null,
                    "is_sensitive": jsonObj[iterate]['is_sensitive'] == 'true' ? false: true,
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false
                })
            } else if (jsonObj[iterate]['action'] == "Send Keys" || jsonObj[iterate]['action'] == "Wait" || jsonObj[iterate]['action'] == "Connect SAP System") {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "action": jsonObj[iterate]['action'],
                    "data_value": jsonObj[iterate]['data_value'],
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_sensitive": jsonObj[iterate]['is_sensitive'] == 'true' ? false: true,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false
                })
            } else if (jsonObj[iterate]['action'] == "Send Virtual Keys") {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "action": jsonObj[iterate]['action'],
                    "data_value": jsonObj[iterate]['data_value'],
                    "element_type": jsonObj[iterate]['element_type'],
                    "element_value": jsonObj[iterate]['element_value'],
                    "access_control_type": null,
                    "property": null,
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_sensitive": jsonObj[iterate]['is_sensitive'] == 'true' ? false: true,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false
                })
            } else if (jsonObj[iterate]['action'] == "Wait For Element" || jsonObj[iterate]['action'] == "Verify Combobox Item" || jsonObj[iterate]['action'] == "Select Combobox Item" || jsonObj[iterate]['action'] == "Create Variable" || jsonObj[iterate]['action'] == "Clear" || jsonObj[iterate]['action'] == "Contains" || jsonObj[iterate]['action'] == "Is Blank" || jsonObj[iterate]['action'] == "Verify Text") {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "data_value": jsonObj[iterate]['data_value'],
                    "action": jsonObj[iterate]['action'],
                    "element_type": jsonObj[iterate]['element_type'],
                    "element_value": jsonObj[iterate]['element_value'],
                    "index": 0,
                    "access_control_type": null,
                    "property": jsonObj[iterate]['property'],
                    "property_value": jsonObj[iterate]['property_value'],
                    "is_sensitive": jsonObj[iterate]['is_sensitive'] == 'true' ? false: true,
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false
                })
            } else if (jsonObj[iterate]['action'] == "Dynamic Set" || jsonObj[iterate]['action'] == "Dynamic Contains" || jsonObj[iterate]['action'] == "Dynamic Verify Text") {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "data_value": jsonObj[iterate]['var_val'],
                    "action": jsonObj[iterate]['action'],
                    "control_type": jsonObj[iterate]['control_type'],
                    "element_type": jsonObj[iterate]['element_type'],
                    "element_value": jsonObj[iterate]['element_value'],
                    "index": 0,
                    "access_control_type": null,
                    "property": null,
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_sensitive": jsonObj[iterate]['is_sensitive'] == 'true' ? false: true,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false
                })
            } else if (jsonObj[iterate]['action'] == "Minimize" || jsonObj[iterate]['action'] == "Maximize" || jsonObj[iterate]['action'] == "Close") {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "action": jsonObj[iterate]['action'],
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_sensitive": jsonObj[iterate]['is_sensitive'] == 'true' ? false: true,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false
                })
            } else if (jsonObj[iterate]['action'].includes('By Coordinates')) {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "action": jsonObj[iterate]['action'],
                    "data_value": jsonObj[iterate]['data_value'],
                    "coords_value": jsonObj[iterate]['coords_value'],
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_sensitive": jsonObj[iterate]['is_sensitive'] == 'true' ? false: true,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false
                })
            } else {
                fillJson.steps_input.push({
                    "step_no": fillJson.steps_input['length'] + 1,
                    "action": jsonObj[iterate]['action'],
                    "element_type": jsonObj[iterate]['element_type'],
                    "element_value": jsonObj[iterate]['element_value'],
                    "index": 0,
                    "access_control_type": null,
                    "property": null,
                    "optional": jsonObj[iterate]['optional'] == 'true' ? true : false,
                    "is_sensitive": jsonObj[iterate]['is_sensitive'] == 'true' ? false: true,
                    "is_parameterized": jsonObj[iterate]['parameterized'] == 'true' ? true : false
                })
            }
        }
        let jsonContent = JSON.stringify(fillJson);
        let PATH;
        let FILENAME = document.getElementById('filename').value ? `${document.getElementById('filename').value}_sap.json` : document.getElementById('btnAttachment').value != 'Import' ? document.getElementById('btnAttachment').value : null;
        if(FILENAME != null){
            PATH = `${process.env.HOMEDRIVE + process.env.HOMEPATH + '\\Downloads' + '\\' + FILENAME}`
        } else {
           PATH = ''
        }
        console.log(`${process.env.HOMEDRIVE + process.env.HOMEPATH + '\\Downloads' + '\\' + FILENAME}.json`);
        if (FILENAME == null) {
            document.getElementById("desk-test-message").style.color = '#E4463C';
            document.getElementById("desk-test-message").innerHTML = "Invalid Operation: File Name Not Provided.";
            return;
        }
        fs.writeFile(PATH, jsonContent, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
        });
        document.getElementById('filename').value = ''
        document.getElementById('btnAttachment').value = 'Import'
        console.log("FILL JSON FOR  SAP " + JSON.stringify(fillJson))
        //window.electron.desktopTest(fillJson, "sap")
        performDeskTest(fillJson, "sap")
    }

    const gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData,
        rowSelection: 'multiple',
        defaultColDef: {
            resizable: true,
            editable: true,
            // initialWidth: 100
        },
        columnTypes: {
            valueColumn: {
              editable: true,
              valueParser: 'Number(newValue)',
              filter: 'agNumberColumnFilter',
            },
          },
        onFirstDataRendered: onFirstDataRendered,
        getRowStyle: ({ node }) => node.rowPinned ? { 'font-style': 'italic' } : 0,
        singleClickEdit: true,
        stopEditingWhenCellsLoseFocus: true,
        onCellEditingStopped: (params) => {
            if (params.node.data['Action Types'] == 'Create Variable') {
                if (params.node.data['Data'] != undefined) {
                    if(variables.includes(params.node.data['Data'])){
                        console.log('data present')
                    } else{
                        variables.push(params.node.data['Data'])
                    }
                }
                console.log(variables)
            } else {
                console.log('other action types')
            }
        },
        suppressDragLeaveHidesColumns: true,
        suppressHorizontalScroll: true
        // suppressAggFuncInHeader: true,
        // enableCellChangeFlash: true,
        // animateRows: true,
    };
    //Grid creation
    const gridDiv = document.getElementById('myGrid');
    new Grid(gridDiv, gridOptions);

    console.log("Calling Set-up grid");
}
