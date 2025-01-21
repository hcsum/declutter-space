"use client";

import { createItem } from "@/actions/items";
import { useActionState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";

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

      <FormControl fullWidth>
        <InputLabel id="deadline-label">Deadline</InputLabel>
        <Select
          labelId="deadline-label"
          id="deadline"
          name="deadline"
          label="Deadline"
          defaultValue="1"
          required
        >
          <MenuItem value="1">1 month</MenuItem>
          <MenuItem value="3">3 months</MenuItem>
          <MenuItem value="6">6 months</MenuItem>
          <MenuItem value="9">9 months</MenuItem>
          <MenuItem value="12">1 year</MenuItem>
          <MenuItem value="18">1.5 years</MenuItem>
          <MenuItem value="24">2 years</MenuItem>
        </Select>
      </FormControl>

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
