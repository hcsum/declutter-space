"use client";

import { createItem } from "@/actions/items";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

const AddItemForm = ({ categories }: { categories: Category[] }) => {
  const router = useRouter();
  const { mutate, isPending, data } = useMutation({
    mutationFn: createItem,
  });

  useEffect(() => {
    if (data?.success) {
      router.push("/dashboard?page=1");
    }
  }, [data?.success, router]);

  return (
    <Box
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        mutate(formData);
      }}
      component="form"
      sx={{ mb: 3, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        id="name"
        name="name"
        label="Item Name"
        required
        fullWidth
        error={!!data?.errors?.name}
        helperText={data?.errors?.name}
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
        error={!!data?.errors?.pieces}
        helperText={data?.errors?.pieces}
      />

      <FormControl fullWidth>
        <InputLabel id="deadline-label">Deadline</InputLabel>
        <Select
          labelId="deadline-label"
          id="deadline"
          name="deadline"
          defaultValue={6}
          label="Deadline"
          required
        >
          <MenuItem value={2}>2 months</MenuItem>
          <MenuItem value={3}>3 months</MenuItem>
          <MenuItem value={6}>6 months</MenuItem>
          <MenuItem value={9}>9 months</MenuItem>
          <MenuItem value={12}>1 year</MenuItem>
          <MenuItem value={18}>1 and a half year</MenuItem>
          <MenuItem value={24}>2 years</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          name="categoryId"
          defaultValue=""
          label="Category"
        >
          <MenuItem value="">None</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Optional</FormHelperText>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        disabled={isPending}
        sx={{ mt: 1 }}
      >
        {isPending ? "Adding..." : "Add Item"}
      </Button>
    </Box>
  );
};

export default AddItemForm;
