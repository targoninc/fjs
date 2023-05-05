import {FactoryJS} from "../../../framework/f.mjs";

export class GenericTemplates {
    static test = testClass => {
        return FactoryJS.create().classes(testClass).build();
    }
}
