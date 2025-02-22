import UiAnnonce from '@tailus-ui/Annonce';

type AnnonceProps = {
  concern?: React.ReactNode;
  message: React.ReactNode;
};

function Annonce({ concern, message }: AnnonceProps) {
  return (
    <UiAnnonce.Root size="xs" variant="outlined" className="w-full">
      {concern && (
        <UiAnnonce.Concern intent="gray">
          {concern}
        </UiAnnonce.Concern>
      )}
      <UiAnnonce.Message className="w-full">
        {message}
      </UiAnnonce.Message>
    </UiAnnonce.Root>
  );
}

export default Annonce;
