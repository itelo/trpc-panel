import React, { useState } from "react";
import { Control, useController, useWatch } from "react-hook-form";
import { ParsedInputNode } from "src/parse/parse-router";
import { Field } from "../Field";
import { defaultFormValuesForNode } from "src/react-app/components/form/utils";
import XIcon from "@mui/icons-material/CloseOutlined";
import { InputGroupContainer } from "src/react-app/components/InputGroupContainer";
import DataArray from "@mui/icons-material/DataArray";
import { AddItemButton } from "src/react-app/components/AddItemButton";
import { FieldError } from "src/react-app/components/form/fields/FieldError";

var currentKeyCount = 0;

export function ArrayField({
    name,
    control,
    node,
}: {
    name: string;
    control: Control<any>;
    node: ParsedInputNode & { type: "array" };
}) {
    const { field, fieldState } = useController({
        name,
        control,
    });
    // To make sure text field state dies when they're deleted
    const [textFieldKeys, setTextFieldKeys] = useState<string[]>([]);

    // For some ungodly reason RHF doesn't update field.value when the child fields update the value in the form
    // state. Each of the changes end up being reflected in the form state so they end up overwriting eachother and stuff.
    // Anyways, useWatch always has the real form state, so we just use it. So ArrayField will always rerender any time
    // the form state changes.
    const watch = useWatch({ control });

    function getValueFromWatch() {
        var r = watch;
        for (var p of node.path) {
            r = r[p];
        }
        return r;
    }

    function onAddClick() {
        setTextFieldKeys((old) => old.concat([currentKeyCount++ + ""]));
        field.onChange(
            getValueFromWatch().concat([
                defaultFormValuesForNode(node.childType),
            ])
        );
    }

    function onDeleteClick(index: number) {
        const newArr = [...getValueFromWatch()];
        const newKeysArr = [...textFieldKeys];
        newArr.splice(index, 1);
        newKeysArr.splice(index, 1);
        field.onChange(newArr);
        setTextFieldKeys(newKeysArr);
    }

    return (
        <InputGroupContainer
            iconElement={<DataArray className="mr-1" />}
            title={name}
        >
            {field.value.map((_: ParsedInputNode, i: number) => (
                <span className="flex flex-row items-start">
                    <span className="flex flex-1 flex-col">
                        <Field
                            key={textFieldKeys[i]}
                            inputNode={{
                                ...node.childType,
                                // Need to calculate path dynamically since
                                // it includes an array index and node.childType.path is always
                                // an empty array
                                path: node.path.concat([`${i}`]),
                            }}
                            control={control}
                        />
                    </span>
                    <button
                        type="button"
                        className="ml-2"
                        onClick={() => onDeleteClick(i)}
                    >
                        <XIcon className="w-5 h-5 mt-[0.45rem] mr-2" />
                    </button>
                </span>
            ))}
            <AddItemButton onClick={onAddClick} />
            {fieldState.error?.message && (
                <FieldError errorMessage={fieldState.error.message} />
            )}
        </InputGroupContainer>
    );
}
