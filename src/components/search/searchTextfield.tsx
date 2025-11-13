interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search characters..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-6 py-3 bg-gray-800 text-white placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
    />
  );
}
