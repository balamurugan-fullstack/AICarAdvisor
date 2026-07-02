import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { RecommendationCard } from '../components/ui/RecommendationCard';
import { FormField } from '../components/common/FormField';
import type { BuyerPreferenceForm, PreferenceFieldError } from '../types/preference';
import type { RecommendItem } from '../types/recommend';
import { getRecommendations } from '../services/recommendService';

const initialForm: BuyerPreferenceForm = {
  budget: '',
  fuel: '',
  transmission: '',
  seatingCapacity: '',
  bodyType: '',
  priority: '',
};

const validateForm = (form: BuyerPreferenceForm): PreferenceFieldError => {
  const nextErrors: PreferenceFieldError = {};

  if (!form.budget.trim()) {
    nextErrors.budget = 'Budget is required.';
  } else if (Number(form.budget) <= 0) {
    nextErrors.budget = 'Budget must be greater than 0.';
  }

  if (!form.fuel) nextErrors.fuel = 'Fuel type is required.';
  if (!form.transmission) nextErrors.transmission = 'Transmission is required.';
  if (!form.seatingCapacity) nextErrors.seatingCapacity = 'Seating capacity is required.';
  if (!form.bodyType) nextErrors.bodyType = 'Body type is required.';
  if (!form.priority) nextErrors.priority = 'Priority is required.';

  return nextErrors;
};

const fuelOptions = ['Petrol', 'Diesel', 'CNG', 'Electric'];
const transmissionOptions = ['Manual', 'Automatic'];
const seatingOptions = ['2', '4', '5', '6', '7'];
const bodyTypeOptions = ['Hatchback', 'Sedan', 'SUV', 'Compact SUV', 'MPV'];
const priorityOptions = ['Mileage', 'Safety', 'Performance', 'Comfort', 'Resale Value', 'Features'];

function BuyerPreference() {
  const [form, setForm] = useState<BuyerPreferenceForm>(initialForm);
  const [errors, setErrors] = useState<PreferenceFieldError>({});
  const [recommendations, setRecommendations] = useState<RecommendItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const nextForm = { ...form, [name]: value };
    setForm(nextForm);

    if (!isSubmitted) {
      return;
    }

    const nextErrors = validateForm(nextForm);
    setErrors(nextErrors);
  };

  const isFormValid = (formData: BuyerPreferenceForm) => Object.keys(validateForm(formData)).length === 0;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitError('');
    setLoading(true);
    setRecommendations([]);

    try {
      const request = {
        budget: Number(form.budget),
        fuel: form.fuel || undefined,
        transmission: form.transmission || undefined,
        bodyType: form.bodyType || undefined,
        seatingCapacity: form.seatingCapacity ? Number(form.seatingCapacity) : undefined,
        priority: form.priority || undefined,
      };

      const response = await getRecommendations(request);
      setRecommendations(response.data);
    } catch (error) {
      console.error('Failed to fetch recommendations', error);
      setSubmitError('Unable to load recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRecommendations([]);
    setSubmitError('');
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <>
      <section className="mx-auto flex min-h-[70vh] w-full max-w-6xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <Card title="Buyer Preferences" description="Tell us what matters most so we can tailor your next car search." className="w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              label="Budget"
              name="budget"
              type="number"
              value={form.budget}
              onChange={handleChange}
              placeholder="Enter your maximum budget"
              error={isSubmitted ? errors.budget : undefined}
            />
            <FormField
              label="Fuel"
              name="fuel"
              type="select"
              value={form.fuel}
              onChange={handleChange}
              options={fuelOptions}
              error={isSubmitted ? errors.fuel : undefined}
            />
            <FormField
              label="Transmission"
              name="transmission"
              type="select"
              value={form.transmission}
              onChange={handleChange}
              options={transmissionOptions}
              error={isSubmitted ? errors.transmission : undefined}
            />
            <FormField
              label="Seating Capacity"
              name="seatingCapacity"
              type="select"
              value={form.seatingCapacity}
              onChange={handleChange}
              options={seatingOptions}
              error={isSubmitted ? errors.seatingCapacity : undefined}
            />
            <FormField
              label="Body Type"
              name="bodyType"
              type="select"
              value={form.bodyType}
              onChange={handleChange}
              options={bodyTypeOptions}
              error={isSubmitted ? errors.bodyType : undefined}
            />
            <FormField
              label="Priority"
              name="priority"
              type="select"
              value={form.priority}
              onChange={handleChange}
              options={priorityOptions}
              error={isSubmitted ? errors.priority : undefined}
            />
          </div>

          <Button type="submit" variant="primary" className="w-full py-4 text-base" disabled={loading}>
            {loading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Finding Best Cars...
              </span>
            ) : (
              'Find My Car'
            )}
          </Button>
        </form>
      </Card>
    </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {recommendations.length > 0 && (
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Top recommendations</h2>
              <p className="mt-2 text-sm text-slate-400">Based on your preferences, these cars are ranked by budget fit, fuel, transmission, mileage and safety.</p>
            </div>
            <Button type="button" variant="outline" onClick={handleReset}>
              Back to preferences
            </Button>
          </div>
        )}
        {submitError ? (
          <div className="rounded-3xl border border-red-600 bg-red-950/80 p-6 text-sm text-red-100">
            {submitError}
          </div>
        ) : null}

        {recommendations.length > 0 && (
          <div className="mt-10 space-y-6">
            <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/30">
              <h2 className="text-2xl font-semibold text-white">Top recommendations</h2>
              <p className="mt-2 text-sm text-slate-400">Based on your preferences, these cars are ranked by budget fit, fuel, transmission, mileage and safety.</p>
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
              {recommendations.map((item) => (
                <RecommendationCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default BuyerPreference;
