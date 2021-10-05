import { useState } from 'react';
import Image from 'next/image';
import ContentContainer from '../../../../shared/components/atoms/ContentContainer';
import Modal from '../../../../shared/components/atoms/Modal';
import AddItemButton from '../../../../shared/components/molecules/AddItemButton';
import useChurrasContext from '../../hooks/useChurrasContext';
import ChurrasList from '../ChurrasList';
import NewChurrasForm from '../NewChurrasForm';

const ChurrasTemplate: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { churras } = useChurrasContext();

  return (
    <>
      <div className="bg-indigo-50 min-h-screen flex flex-col">
          <div className="py-2 bg-indigo-300 shadow-md mb-10">
            <ContentContainer className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Agenda de Churras</h1>
                <h5 className="text-gray-800 text-sm font-medium">Há {churras.length} churras marcados</h5>
              </div>
              <AddItemButton onClick={() => setIsFormOpen(true)}/>
            </ContentContainer>
          </div>
        <ContentContainer className="relative flex-grow">
          <ChurrasList churras={churras} />
        </ContentContainer>
        <div className="flex justify-center py-3">
          <Image
            src="/logo.svg"
            width={50}
            height={50}
            alt=""
          />
        </div>
      </div>
      <Modal 
        open={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        className="max-w-2xl w-full"
      >
        <NewChurrasForm close={() => setIsFormOpen(false)}/>
      </Modal>
    </>
  );
};

export default ChurrasTemplate;
