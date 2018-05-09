using Newtonsoft.Json.Linq;
using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.ApplicationModel.DataTransfer;
using Windows.UI.Core;

namespace Cl.Json.RNShare
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNShareModule : NativeModuleBase
    {
        private readonly DataTransferManager _dataTransferManager;
        private readonly Queue<RequestData> _queue;

        /// <summary>
        /// Instantiates the <see cref="RNShareModule"/>.
        /// </summary>
        internal RNShareModule()
        {
            _dataTransferManager = DataTransferManager.GetForCurrentView();
            _dataTransferManager.DataRequested += DataRequested;

            _queue = new Queue<RequestData>();
        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNShare";
            }
        }

        /// <summary>
        /// Open Share UI and provide data for sharing.
        /// </summary>
        /// <param name="options"></param>
        [ReactMethod]
        public void open(JObject options, ICallback errorCallback, ICallback successCallback)
        {
            if (options != null)
            {
                var requestData = new RequestData
                {
                    Title = options.Value<string>("title"),
                    Text = options.Value<string>("share_text"),
                    Url = options.Value<string>("share_URL"),
                };

                if (requestData.Text == null && requestData.Title == null && requestData.Url == null)
                {
                    return;
                }

                RunOnDispatcher(() =>
                {
                    lock (_queue)
                    {
                        _queue.Enqueue(requestData);
                    }

                    try
                    {
                        DataTransferManager.ShowShareUI();
                        successCallback.Invoke("OK");
                    }
                    catch
                    {
                        errorCallback.Invoke("not_available");
                    }
                });
            }
        }

        private void DataRequested(DataTransferManager sender, DataRequestedEventArgs e)
        {
            var requestData = default(RequestData);
            lock (_queue)
            {
                requestData = _queue.Dequeue();
            }

            if (requestData.Title != null)
            {
                e.Request.Data.Properties.Title = requestData.Title;
            }

            if (requestData.Text != null)
            {
                e.Request.Data.SetText(requestData.Text);
            }

            if (requestData.Url != null)
            {
                e.Request.Data.SetUri(new Uri(requestData.Url));
            }
        }

        private static async void RunOnDispatcher(DispatchedHandler action)
        {
            await CoreApplication.MainView.CoreWindow.Dispatcher.RunAsync(CoreDispatcherPriority.Normal, action);
        }

        private struct RequestData
        {
            public string Title;
            public string Text;
            public string Url;
        }
    }
}