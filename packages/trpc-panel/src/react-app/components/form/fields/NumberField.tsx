import { Control, useController } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { BaseTextField } from "./base/BaseTextField";
import { ParsedInputNode } from "src/parse/parse-router";

export function NumberField({
    name,
    control,
    node: inputNode,
}: {
    name: string;
    control: Control<any>;
    node: ParsedInputNode;
}) {
    const [stringValue, setStringValue] = useState("");

    const { field, fieldState } = useController({
        control,
        name,
    });

    function onChange(value: string) {
        if (value == "") {
            setStringValue("");
            return;
        }
        const numberValue = parseFloat(value);
        if (isNaN(numberValue)) return;
        setStringValue(
            numberValue + (value[value.length - 1] == "." ? "." : "")
        );
    }

    useEffect(() => {
        // Not sure how else to do this while still allowing users to input a decimal point
        field.onChange(parseFloat(stringValue));
    }, [stringValue]);

    // ¯\_(ツ)_/¯
    useEffect(() => {
        if (!field.value) setStringValue("");
    }, [field.value]);

    return (
        <BaseTextField
            onChange={onChange}
            value={stringValue}
            errorMessage={fieldState.error?.message}
            label={name}
            fieldId={inputNode.path.join(".")}
            inputProps={{ inputMode: "decimal" }}
        />
    );
}
