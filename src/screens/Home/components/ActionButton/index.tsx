import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

interface ActionButtonProps {
  onPress: () => void;
}

export default function ActionButton({onPress}: ActionButtonProps) {
  return (
    <RoundedButton onPress={onPress}>
      <Icon name={'plus'} size={26} color={'#fff'} />
    </RoundedButton>
  );
}

const RoundedButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 30px;
  background-color: #202020;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 20px;
  right: 20px;
`;
