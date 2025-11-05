import { Control } from "react-hook-form";
import { z } from "zod";
import { signUpSchema } from "@/lib/validation/signupSchema";
import {
  fetchAddressFromCEP,
  AddressData,
} from "@/lib/services/address/cep-service";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CepFieldProps {
  control: Control<z.infer<typeof signUpSchema>>;
  onAddressFetched: (addressData: AddressData | null) => void;
}

const formatCEP = (value: string) => {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length <= 5) return cleaned;
  return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`;
};

export function CepField({ control, onAddressFetched }: CepFieldProps) {
  return (
    <FormField
      control={control}
      name="zipCode"
      render={({ field }) => (
        <FormItem>
          <FormLabel>CEP</FormLabel>
          <FormControl>
            <Input
              placeholder="Seu CEP"
              {...field}
              onChange={async (e) => {
                const formatted = formatCEP(e.target.value);
                field.onChange(formatted);
                const cleaned = formatted.replace("-", "");
                if (cleaned.length === 8) {
                  const addressData = await fetchAddressFromCEP(cleaned);
                  onAddressFetched(addressData);
                }
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
