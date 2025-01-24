"use client";

import { createItem } from "@/actions/items";
import { useActionState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

const AddItemForm = () => {
  const [state, action, pending] = useActionState(createItem, undefined);

  return (
    <Box
      component="form"
      action={action}
      sx={{ mb: 3, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        id="name"
        name="name"
        label="Item Name"
        required
        fullWidth
        error={!!state?.errors?.name}
        helperText={state?.errors?.name}
      />

      <TextField
        id="pieces"
        name="pieces"
        label="Pieces"
        type="number"
        required
        fullWidth
        defaultValue={1}
        slotProps={{
          htmlInput: {
            min: 1,
            step: 1,
          },
        }}
        error={!!state?.errors?.pieces}
        helperText={state?.errors?.pieces}
      />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Deadline"
          name="deadline"
          slotProps={{
            textField: {
              required: true,
              fullWidth: true,
              error: !!state?.errors?.deadline,
              helperText: state?.errors?.deadline,
            },
          }}
        />
      </LocalizationProvider>

      <Button
        type="submit"
        variant="contained"
        disabled={pending}
        sx={{ mt: 1 }}
      >
        {pending ? "Adding..." : "Add Item"}
      </Button>
    </Box>
  );
};

export default AddItemForm;
