#pragma once

#include "JSValue.h"
#include "NativeModules.h"
#include <winrt/Windows.ApplicationModel.DataTransfer.h>

using namespace winrt::Microsoft::ReactNative;
using namespace winrt::Windows::ApplicationModel::DataTransfer;

namespace winrt::ReactNativeShare
{

REACT_STRUCT(RequestData)
struct RequestData
{
		std::wstring title;
		std::wstring message;
		std::wstring url;
};

REACT_MODULE(ReactNativeShare, L"RNShare")
struct ReactNativeShare
{
		REACT_INIT(Initialize)
		void Initialize(ReactContext const &reactContext) noexcept
		{
				context = reactContext;

				context.UIDispatcher().Post([&]() {
						DataTransferManager dataTransferManager = DataTransferManager::GetForCurrentView();
						auto dataRequestedToken = dataTransferManager.DataRequested(TypedEventHandler<DataTransferManager, DataRequestedEventArgs>(this, &ReactNativeShare::handleDataRequest));
				});
		}

		REACT_METHOD(open)
		void open(JSValueObject options, std::function<void(JSValue)> errorCallback, std::function<void(JSValue, JSValue)> successCallback) noexcept
		{
				if (options["title"] == nullptr) {
						errorCallback("no_title_provided");
						return;
				}

				if ((options["message"] == nullptr) && (options["url"] == nullptr))
				{
						errorCallback("no_message_or_url_provided");
						return;
				}

				requestData.title = to_hstring(options["title"].AsString());

				if (options["message"] != nullptr)
				{
						requestData.message = to_hstring(options["message"].AsString());
				}

				if (options["url"] != nullptr){
						requestData.url = to_hstring(options["url"].AsString());
				}

				context.UIDispatcher().Post([&, errorCallback, successCallback]() {
						try
						{
								DataTransferManager::ShowShareUI();
								successCallback(true, "OK");
						}
						catch (hresult_error const& e)
						{
								errorCallback("not_available");
						}
				});
		}

		REACT_METHOD(addListener);
		void addListener(std::string) noexcept
		{
				// Keep: Required for RN built in Event Emitter Calls.
		}

		REACT_METHOD(removeListeners);
		void removeListeners(int64_t) noexcept
		{
				// Keep: Required for RN built in Event Emitter Calls.
		}

		void handleDataRequest(DataTransferManager sender, DataRequestedEventArgs e)
		{
				e.Request().Data().Properties().Title(requestData.title);

				if (!requestData.message.empty())
				{
						e.Request().Data().SetText(requestData.message);
				}

				if (!requestData.url.empty())
				{
						Windows::Foundation::Uri uri{ requestData.url };
						e.Request().Data().SetUri(uri);
				}

				requestData = {};
		}

		private:
				ReactContext context;
				RequestData requestData = {};
};

} // namespace winrt::ReactNativeShare
