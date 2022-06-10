
export default (platform: string) => {
  let languages = [
    {label: 'JavaScript', value: 'javascript'},
    {label: 'Swift', value: 'swift'},
    {label: 'Objective-C', value: 'objc'},
    {label: 'Kotlin', value: 'kotlin'},
    {label: 'Java', value: 'java'},
    {label: 'C#', value: 'csharp'},
    {label: 'C++', value: 'cpp'},
    {label: 'Rust', value: 'rust'},
    {label: 'HTTP', value: 'http'}
  ]
  switch (platform) {
    case 'android': 
      languages = [
        {label: 'Kotlin', value: 'kotlin'},
        {label: 'Java', value: 'java'}
      ]
      break;
    case 'ios': 
      languages = [
        {label: 'Swift', value: 'swift'},
        {label: 'Objective-C', value: 'objc'},
      ]
      break;
    case 'raspberrypi':
      languages = [
        {label: 'C++', value: 'cpp'},
        {label: 'Rust', value: 'rust'},
        {label: 'HTTP', value: 'http'}
      ]
    case undefined:
      break;
    default:
      languages = languages.filter(lang => lang.value === platform)
      break;
  }

  return languages
}