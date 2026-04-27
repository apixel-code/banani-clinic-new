export default function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sz = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }[size];
  return (
    <div className="flex items-center justify-center p-8">
      <div className={`${sz} rounded-full animate-spin`} style={{ border: '3px solid #D6E9FF', borderTopColor: '#2B7CC1' }} />
    </div>
  );
}
