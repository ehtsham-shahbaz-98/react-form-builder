// Component Example

// this is going to take value from answers in form generator
//   console.log('check here', props);
//   if (
//     (!props.data.props.defaultValue || props.data.props.defaultValue === '') &&
//     props.defaultValue
//   )
//     props.data.props.defaultValue = props.defaultValue;
//   const { defaultValue } = props.data.props;
//   const selectionOptions =
//     'Administering Tetanus immunizations or other immunizations such as Hepatitis B vaccine,Admission to a hospital or equivalent medical facility for treatment,Application of butterfly adhesive dressing(s) or Steri Strip(s) in lieu of sutures,Application of sutures (stitches),Administering Tetanus immunizations or other immunizations such as Hepatitis B vaccine.,Admission to a hospital or equivalent medical facility for treatment.,Application of butterfly adhesive dressing(s) or Steri Strip(s) in lieu of sutures.,Others (Please Specify)';
//   const { title } = props.data.props;
//   const [selected, setSelected] = useState(defaultValue?.split(',') || []);
//   const [allOptions, setAllOptions] = useState(selectionOptions.split(','));

//   useEffect(() => {
//     if (props.data.selectionOptions) {
//       setAllOptions(
//         props.data.selectionOptions.split(',').map((item) => item.trim())
//       );
//     }
//   }, [props]);