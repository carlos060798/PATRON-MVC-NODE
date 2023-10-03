const usePublication = () => {
  const [formData, setFormData] = useState({
    text: "",
    file: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const CreatePublication = async (e, ) => {
    e.preventDefault();
  };

  return {
    formData,
    handleChange,
    CreatePublication,
  };
};

export default usePublication;
