import {  DistributionKey } from "./DataTypes";
import { TabType } from "./enums";

export interface DataComponentProps {
    type:TabType
}

export interface AreaComponentProps{
    name:string,
    distributionKey:DistributionKey
}