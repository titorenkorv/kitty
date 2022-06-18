import { BackgroundContainer } from '@src/components/background'
import { Button, Input, Text } from '@ui-kitten/components'
import { TouchableOpacity, View } from 'react-native'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withDelay, withSequence, withTiming } from 'react-native-reanimated'
import { useCallback, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

export const StartScreen = () => {
  const nav = useNavigation()
  const { top } = useSafeAreaInsets()
  const anim = useSharedValue(0)
  const loginInput = useRef('')
  const passInput = useRef('')
  const [isError, setIsError] = useState(true)
  const login = useCallback(() => {
    let error = false
    if (loginInput.current.indexOf('@') === -1) {
      error = true
    }
    if (loginInput.current !== 'killeserver@gmail.com') {
      error = true
    }
    if (passInput.current !== '111222333') {
      error = true
    }
    setIsError(error)
    anim.value = withTiming(0, { duration: 0 }, () => {
      anim.value = withSequence(withTiming(1, { duration: 500 }), withDelay(1200, withTiming(0, { duration: 500 })))
    })
  }, [])
  const styleError = useAnimatedStyle(
    () => ({
      transform: [{ translateY: interpolate(anim.value, [0, 1], [-100, 0]) }]
    }),
    []
  )
  const Bottom = () => (
    <View style={{ width: '100%' }}>
      <View style={{ alignSelf: 'center', flexDirection: 'row', marginBottom: 10 }}>
        <Text category={'h6'} style={{ color: '#FFFFFF', opacity: 0.5 }}>
          Forgot your{' '}
        </Text>
        <View>
          <Text category={'h6'} style={{ color: '#FFFFFF', opacity: 0.5 }}>
            password?
          </Text>
          <View style={{ width: '100%', height: 1, position: 'absolute', bottom: 0, left: 0, backgroundColor: '#FFFFFF', opacity: 0.5 }} />
        </View>
      </View>
    </View>
  )
  const Error = () => (
    <Animated.View style={[styleError, { zIndex: 50, width: '100%', position: 'absolute', top: 0, left: 0 }]}>
      {!isError ? (
        <View
          style={{
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            paddingTop: top,
            width: '100%',
            alignSelf: 'center',
            backgroundColor: 'rgba(141, 220, 141, 0.95)'
          }}>
          <Text style={{ paddingVertical: 20, textAlign: 'center', color: '#fff' }} category="h4">
            Success authorization
          </Text>
        </View>
      ) : (
        <View
          style={{
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            paddingTop: top,
            width: '100%',
            alignSelf: 'center',
            backgroundColor: 'rgba(220, 141, 141, 0.95)'
          }}>
          <Text style={{ paddingVertical: 20, textAlign: 'center', color: '#fff' }} category="h4">
            Wrong Email or Password
          </Text>
        </View>
      )}
    </Animated.View>
  )
  return (
    <BackgroundContainer title="Sign-in" bottom={Bottom} errorComponent={Error}>
      <Input
        placeholder="Email"
        style={{ marginBottom: 15 }}
        onChangeText={(text: string) => {
          loginInput.current = text
        }}
        textContentType="emailAddress"
      />
      <Input
        placeholder="Password"
        style={{ marginBottom: 30 }}
        onChangeText={(text: string) => {
          passInput.current = text
        }}
        secureTextEntry
      />
      <View style={{ alignItems: 'center', marginBottom: 15 }}>
        <Button style={{ width: '80%', backgroundColor: '#00ABB9', borderColor: '#00ABB9' }} onPress={login}>
          Login
        </Button>
      </View>
      <Text style={{ textAlign: 'center', marginBottom: 15 }}>or</Text>
      <View style={{ alignItems: 'center', marginBottom: 30 }}>
        <TouchableOpacity
          style={{
            width: '90%',
            marginBottom: 20,
            backgroundColor: '#00A3FF26',
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 7,
            paddingLeft: 15
          }}>
          <GoogleIcon />
          <View style={{ marginLeft: 10, width: 150 }}>
            <Text category="p1" style={{ textAlign: 'center', color: '#fff' }}>
              Continue with Google
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '90%', backgroundColor: '#00A3FF26', flexDirection: 'row', alignItems: 'center', paddingVertical: 7, paddingLeft: 15 }}>
          <FacebookIcon />
          <View style={{ marginLeft: 10, width: 150 }}>
            <Text category="p1" style={{ textAlign: 'center', color: '#fff' }}>
              Continue with Facebook
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={{ color: '#454545', textAlign: 'center', marginBottom: 30 }} category="p1">
        Don't have an account?
      </Text>
      <View style={{ alignItems: 'center', marginBottom: 30 }}>
        <Button
          onPress={() => {
            nav.navigate('register')
          }}
          style={{ width: '80%', backgroundColor: '#00ABB9', borderColor: '#00ABB9' }}>
          Create account
        </Button>
      </View>
    </BackgroundContainer>
  )
}

const GoogleIcon = () => <AntDesign name="google" size={24} color="#00ABB9" />
const FacebookIcon = () => <FontAwesome5 name="facebook" size={24} color="#00ABB9" />
