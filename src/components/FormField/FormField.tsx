import { Controller } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { FormFieldProps } from "../ViewDocuments/Types";
import { formatPrice } from "../../lib/formatPrice";
import './FormFiels.css'
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
export const FormField = ({
  name,
  control,
  rules,
  label,
  placeholder,
  disabled = false,
  errors,
  autoFocus = false,
  trigger,
  className = {},
  type = "text",
  requrid = false,
  readOnly = false
}: any & { type?: "text" | "price" }) => (
  <div className={`${className.container || ""} !p-0`}>
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          let rawValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
          rawValue = rawValue.replace(/^0+/, ""); // Remove leading zeros

          if (type === "price") {
            field.onChange(rawValue ? parseFloat(rawValue, 10) : "");
          } else {
            field.onChange(e.target.value);
          }
        };

        let formattedValue = type === "price" && field.value
          ? new Intl.NumberFormat("en-US").format(field.value) // Format with commas
          : field.value;

        return (
          <>
            <div className={`border ${errors[name] && '!border-red_5'} rounded-[5px] flex back justify-between border-blue_3 focus-within:border-[#9a732e] `}>
            {/* max-w-[90%] md:max-w-full */}
              <label className={`${className.lable} ${errors[name] ? 'bg-errorInput' : 'bg-blue_2'}   w-[125px] max-w-[125]  text-[14px] rounded-l-none rounded-[5px] text-headerTitle   h-[37px] flex items-center justify-center self-center `}>
                {label}  
                {requrid && <span className="text-red_5">*</span>}
              </label>
              <div className={`border-r ${errors[name] && 'border-red_5'} rounded-l-[5px] border-[inherit] bg-white rounded-br-[18px] w-[calc(100%-115px)]   mr-[-20px] input`}>
                <Input
                  autoFocus={autoFocus}
                  {...field}
                  read-only={readOnly}
                  value={formattedValue}
                  onChange={handleChange}
                  className={`${className.input || ""} focus-visible:ring-0 border-0 shadow-none`}
                  placeholder={placeholder}
                  disabled={disabled}
                  type={type === "price" ? "tel" : type}
                  autoComplete="off"
                  onBlur={field.onBlur}
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (name === "gramWage") {
                        const gramWage = document.getElementsByName("gramWage")[0].value
                        const percentageWage = document.getElementsByName("percentageWage")[0].value
                        const weight = parseFloat(document.getElementsByName("weight")[0].value)
                        console.log(gramWage, percentageWage);

                        if (!gramWage && !percentageWage && weight) {
                          const totalWage = prompt("لطفا مقدار اجرت کل را وارد نمایید")
                          field.value = (parseFloat(totalWage) / weight) || 0
                        }
                      }
                      const form = e.currentTarget?.closest('form');
                      if (form) {
                        const focusableElements = form.querySelectorAll(
                          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                        );
                        const currentElement = e.currentTarget;
                        const currentIndex = Array.from(focusableElements).indexOf(currentElement);
                        if (currentIndex !== -1) {
                          const isValid = await trigger(name); // validate input
                          if (!isValid) return false
                          const nextIndex = currentIndex + 1;
                          if (nextIndex < focusableElements.length) {
                            const nextElement = focusableElements[nextIndex] as HTMLElement;
                            nextElement.focus();
                            nextElement.click();
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
            <ScrollArea className="max-h-20 overflow-auto max-w-[90%] md:max-w-full">
              <p >{type === "price" && field.value && formatPrice(field.value).persian}</p>
              <ScrollBar orientation="vertical"/>
            </ScrollArea>
            {errors[name] && (
              <p className="text-red_5 text-right text-[10px] mt-1">
                {errors[name].message}
              </p>
            )}
          </>
        );
      }}
    />
  </div>
);
