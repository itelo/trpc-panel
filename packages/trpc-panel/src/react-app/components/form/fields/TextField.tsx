import { Control, useController } from "react-hook-form";
import React from "react";
import { BaseTextField } from "./base/BaseTextField";
import { ParsedInputNode } from "src/parse/parse-router";

export function TextField({
    name,
    control,
    node: inputNode,
}: {
    name: string;
    control: Control;
    node: ParsedInputNode;
}) {
    const { field, fieldState } = useController({
        name,
        control,
    });

    return (
        <BaseTextField
            value={field.value ? field.value : ""}
            onChange={field.onChange}
            errorMessage={fieldState.error?.message}
            label={`${name}${inputNode.optional ? "" : "*"}`}
            fieldId={inputNode.path.join(".")}
        />
    );
}
