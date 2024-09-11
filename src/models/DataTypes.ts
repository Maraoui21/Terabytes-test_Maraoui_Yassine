import { TabType } from "./enums";

interface Distribution {
    id: string;
    name: string;
    color: string;
    percentage: number;
}

export interface DistributionKey {
    id: string;
    name: string;
    isGlobalDistributionKey: boolean;
    linkedTo: string;
    distributions: Distribution[];
}

interface Flag {
    id: number;
    indirectCostCategory: any;
}

export interface Node {
    id: string;
    hasSecondColumn: boolean;
    value: string;
    secondColumn: string;
    initialValue: number;
    calculatedValue: number;
    rules: any[];
    nodes: Node[];
}

export interface DataItem {
    name: string;
    selectionId: string;
    readOnly: boolean;
    distributionKey: DistributionKey;
    flag: Flag;
    nodes: Node[];
}

export interface MainData {
    id: string;
    data: DataItem[];
    name: TabType;
    headers: string[];
    areas: string[];
}