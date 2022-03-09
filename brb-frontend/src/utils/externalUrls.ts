// Contains hard-coded URLs

interface BasicUserDetails {
  name?: string;
  emailAddress?: string;
}

export const getUpdatePlanUrl: (user: BasicUserDetails) => string = ({
  name = '',
  emailAddress = '',
}: BasicUserDetails) => `https://form.typeform.com/to/NrXpmPjk#email=${encodeURIComponent(emailAddress)}&name=${encodeURIComponent(name)}`;

export const getPauseCancelUrl: (user: BasicUserDetails) => string = ({
  name = '',
  emailAddress = '',
}: BasicUserDetails) => `https://form.typeform.com/to/Ee5qwN#email=${encodeURIComponent(emailAddress)}&name=${encodeURIComponent(name)}`;

export default {
  getUpdatePlanUrl,
  getPauseCancelUrl,
};
