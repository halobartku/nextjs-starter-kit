export function truncate(str: string, length: number) {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}...`;
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function generateInitials(name: string) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function removeSpecialCharacters(str: string) {
  return str.replace(/[^a-zA-Z0-9 ]/g, '');
}

export function maskEmail(email: string) {
  const [name, domain] = email.split('@');
  const maskedName = `${name[0]}${'*'.repeat(name.length - 2)}${name[name.length - 1]}`;
  return `${maskedName}@${domain}`;
}
