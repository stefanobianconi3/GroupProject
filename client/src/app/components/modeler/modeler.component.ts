import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Modeler, OriginalPropertiesProvider, PropertiesPanelModule, InjectionNames, OriginalPaletteProvider} from "../../assets/bpmn-js/bpmn-js";
import {CustomPropsProvider} from '../../assets/props-provider/CustomPropsProvider';
import {CustomPaletteProvider} from "../../assets/props-provider/CustomPaletteProvider";


const customModdle = {
  name: "customModdle",
  uri: "http://example.com/custom-moddle",
  prefix: "custom",
  xml: {
    tagAlias: "lowerCase"
  },
  associations: [],
  types: [
    {
      "name": "ExtUserTask",
      "extends": [
        "bpmn:UserTask"
      ],
      "properties": [
        {
          "name": "worklist",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
  ]
};

@Component({
  selector: 'app-modeler',
  templateUrl: './modeler.component.html',
  styleUrls: ['./modeler.component.css']
})
export class ModelerComponent implements OnInit {
  
  modeler;
  bpmnXML =
  '<?xml version="1.0" encoding="UTF-8"?>' +
  '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                    'xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
                    'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" ' +
                    'xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" ' +
                    'targetNamespace="http://bpmn.io/schema/bpmn" ' +
                    'id="Definitions_1">' +
    '<bpmn:process id="Process_1" isExecutable="false">' +
      '<bpmn:startEvent id="StartEvent_1"/>' +
    '</bpmn:process>' +
    '<bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
      '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">' +
        '<bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">' +
          '<dc:Bounds height="36.0" width="36.0" x="173.0" y="102.0"/>' +
        '</bpmndi:BPMNShape>' +
      '</bpmndi:BPMNPlane>' +
    '</bpmndi:BPMNDiagram>' +
  '</bpmn:definitions>';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.modeler = new Modeler({
      container: '#canvas',
      width: '100%',
      height: '500px',
      additionalModules: [
        PropertiesPanelModule,

        // Re-use original bpmn-properties-module, see CustomPropsProvider
        {[InjectionNames.bpmnPropertiesProvider]: ['type', OriginalPropertiesProvider.propertiesProvider[1]]},
        {[InjectionNames.propertiesProvider]: ['type', CustomPropsProvider]},

        // Re-use original palette, see CustomPaletteProvider
        {[InjectionNames.originalPaletteProvider]: ['type', OriginalPaletteProvider]},
        {[InjectionNames.paletteProvider]: ['type', CustomPaletteProvider]},
      ],
    
      /* propertiesPanel: {
        parent: '#properties'
      },*/
      moddleExtension: {
        custom: customModdle
      }
    });
    this.modeler.importXML(this.bpmnXML, function(err) {
      if(err){
        console.log(err)
      }
    });
  }

  handleError(err: any) {
    if (err) {
      console.warn('Ups, error: ', err);
    }
  }

  save(): void {
    this.modeler.saveXML((err: any, xml: any) => console.log('Result of saving XML: ', err, xml));
  }
}

