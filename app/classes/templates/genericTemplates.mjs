import {FJS} from "../../../framework/f.mjs";

export class GenericTemplates {
    static test = testClass => {
        return FJS.create("span")
            .classes(testClass)
            .attributes('data-test', 'test', 'data-test2', 'test2')
            .text('test text')
            .onclick(() => {
                console.log('test');
            })
            .build();
    }
}
